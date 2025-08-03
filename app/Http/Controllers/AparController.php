<?php

namespace App\Http\Controllers;

use App\Imports\AparImport;
use App\Models\Apar;
use Barryvdh\DomPDF\Facade\Pdf;
use Barryvdh\Snappy\Facades\SnappyPdf;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\View;
use Inertia\Inertia;
use Intervention\Image\Laravel\Facades\Image;
use Maatwebsite\Excel\Facades\Excel;
// third party
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Symfony\Component\HttpFoundation\StreamedResponse;

class AparController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('permission:permissions index', only: ['index', 'generateQRCode']),
            new Middleware('permission:permissions create', only: ['create', 'store']),
            new Middleware('permission:permissions edit', only: ['edit', 'update']),
            new Middleware('permission:permissions delete', only: ['destroy'])
        ];
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $apar = Apar::with('user')->get();
        return Inertia::render('fire-safety/apar/index', [
            'apar' => $apar,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('fire-safety/apar/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'kode_apar' => 'required|string|max:255|unique:apar,kode_apar',
            'lokasi' => 'required|string|max:255',
            'jenis' => 'required|in:CO2,Powder,Foam,Air',
            'size' => 'required',
            'user_id' => 'nullable|exists:users,id',
        ]);

        $apar = Apar::create($validated);

        return redirect()->route('apar.index')->with('success', 'APAR berhasil ditambahkan.');
    }
    // Cetak QR Code
    /**
     * Generate a QR code for the specified APAR and return it as a PDF.
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function generateQRCode($id)
    {
        $apar = Apar::findOrFail($id);
        $url = url('/inspection/apar-inspeksi/' . $apar->id);

        // Generate QR code binary PNG
        $qrCode = QrCode::format('png')
            ->size(300)
            ->generate($url);

        // Convert to stream
        $tempStream = fopen('php://memory', 'r+');
        fwrite($tempStream, $qrCode);
        rewind($tempStream);

        // Intervention Image V3

        $canvas = Image::create(300, 300)->fill('#ffffff');
        $qr = Image::read($tempStream)->resize(275, 275);
        $canvas->place($qr, 'center', 0, 0);

        // Convert to base64
        $encoded = (string) $canvas->toJpeg(); // or toPng()
        $base64 = 'data:image/jpeg;base64,' . base64_encode($encoded);

        // Generate PDF from Blade
        $pdf = Pdf::loadView('apar.qrcode', [
            'kode_apar' => $apar->kode_apar,
            'qr_base64' => $base64,
        ])->setPaper('A4');

        return $pdf->download("qr_apar_{$apar->kode_apar}.pdf");
    }
    // generate Mass QR Code
    public function generateMassQRCode(Request $request)
    {
        ini_set('max_execution_time', 60);
        ini_set('memory_limit', '256M');

        $batch = $request->get('batch', 1);
        $perPage = 30;

        $apars = Apar::orderBy('id')
            ->skip(($batch - 1) * $perPage)
            ->take($perPage)
            ->get();

        $apars = $apars->map(function ($apar) {
            $filename = 'qrcodes/qr-' . $apar->kode_apar . '.png';
            $storagePath = storage_path('app/public/' . $filename);

            // Generate hanya jika belum ada
            if (!file_exists($storagePath)) {
                $qr = QrCode::format('png')
                    ->size(150)
                    ->generate(url('/inspection/apar-inspeksi/' . $apar->id));
                Storage::disk('public')->put($filename, $qr);
            }

            return [
                'kode_apar' => $apar->kode_apar,
                'lantai' => $apar->lantai,
                'lokasi' => $apar->lokasi,
                'qr_base64' => 'data:image/png;base64,' . base64_encode(file_get_contents($storagePath)),
            ];
        });

        $html = View::make('apar.qrexports_pdf', [
            'apars' => $apars,
            'batch' => $batch,
            'lantai' => $request->get('lantai') // Tambahkan ini
        ])->render();

        $pdf = Pdf::loadHTML($html)->setPaper('a4', 'portrait');

        return $pdf->download('qr-code-apar-batch-' . $batch . '.pdf');
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
        $apar = Apar::findOrFail($id);
        if (!$apar) {
            return redirect()->back()->with('error', 'Data not found.');
        }
        $validated = $request->validate([
            'kode_apar' => 'required|string|max:255|unique:apar,kode_apar,' . $apar->id,
            'lokasi' => 'required|string|max:255',
            'jenis' => 'required|in:CO2,Powder,Foam,Air',
            'size' => 'required|in:2,4,6,9',
            'user_id' => 'nullable|exists:users,id',
        ]);

        $apar->update($validated);

        return redirect()->route('apar.index')->with('success', 'APAR berhasil diperbarui.');
    }
    public function showUploadForm()
    {
        return Inertia::render('fire-safety/apar/UploadExcel');
    }
    public function import(Request $request)
    {
        $apars = $request->input('data', []);

        $validator = Validator::make(['data' => $apars], [
            'data.*.kode_apar' => 'required|string|max:25|distinct|unique:apar,kode_apar',
            'data.*.lantai' => 'nullable|string|max:50',
            'data.*.lokasi' => 'required|string|max:100',
            'data.*.jenis' => 'required|string|in:CO2,Powder,Foam,Air',
            'data.*.size' => 'required|numeric|min:1|max:50',
        ]);

        if ($validator->fails()) {
            Log::error('APAR import validation failed', $validator->errors()->toArray());
            return back()->withErrors($validator)->withInput();
        }

        try {
            $importedCount = 0;
            $updatedCount = 0;

            foreach ($apars as $row) {
                $result = Apar::updateOrCreate(
                    ['kode_apar' => $row['kode_apar']],
                    [
                        'lantai' => $row['lantai'] ?? null,
                        'lokasi' => $row['lokasi'],
                        'jenis' => $row['jenis'],
                        'size' => $row['size'],
                        'user_id' => Auth::id(),
                    ]
                );

                $result->wasRecentlyCreated ? $importedCount++ : $updatedCount++;
            }

            $message = sprintf(
                'Import APAR berhasil! %d data baru ditambahkan, %d data diperbarui.',
                $importedCount,
                $updatedCount
            );

            return redirect()->route('apar.index')->with('success', $message);
        } catch (\Exception $e) {
            Log::error('APAR import failed: ' . $e->getMessage());
            return back()->with('error', 'Terjadi kesalahan saat mengimpor data APAR: ' . $e->getMessage());
        }
    }

    public function getFilterOptions()
    {
        $lantai = Apar::select('lantai')
            ->distinct()
            ->whereNotNull('lantai')
            ->where('lantai', '!=', '')
            ->pluck('lantai');
        $size = Apar::select('size')
            ->distinct()
            ->whereNotNull('size')
            ->where('size', '!=', '')
            ->pluck('size');
        $jenis = Apar::select('jenis')
            ->distinct()
            ->whereNotNull('jenis')
            ->where('jenis', '!=', '')
            ->pluck('jenis');
        $total = Apar::count();
        $perPage = 30;
        $totalBatch = ceil($total / $perPage);

        return response()->json([
            'size' => $size,
            'jenis' => $jenis,
            'lantai' => $lantai,
            'totalBatch' => $totalBatch,
        ]);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $apar = Apar::findOrFail($id);
        $apar->delete();

        return redirect()->route('apar.index')->with('success', 'APAR berhasil dihapus.');
    }
}
