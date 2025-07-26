<?php

namespace App\Http\Controllers;

use App\Imports\AparImport;
use App\Models\Apar;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
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
        set_time_limit(0);
        ini_set('memory_limit', '512M');

        $batch = $request->get('batch', 1); // default batch ke-1
        $perPage = 50;

        $apar = Apar::skip(($batch - 1) * $perPage)
            ->take($perPage)
            ->get();

        $qrDataList = [];

        foreach ($apar as $item) {
            $url = url('/inspection/apar-inspeksi/' . $item->id);
            $qrCode = QrCode::format('png')
                ->size(300)
                ->generate($url);

            $tempStream = fopen('php://memory', 'r+');
            fwrite($tempStream, $qrCode);
            rewind($tempStream);

            $canvas = Image::create(300, 300)->fill('#ffffff');
            $qr = Image::read($tempStream)->resize(275, 275);
            $canvas->place($qr, 'center', 0, 0);

            $encoded = (string) $canvas->toJpeg(); // or toPng()
            $base64 = 'data:image/jpeg;base64,' . base64_encode($encoded);

            $qrDataList[] = [
                'kode_apar' => $item->kode_apar,
                'lokasi' => $item->lokasi,
                'qr_base64' => $base64,
            ];
        }
        $qrDataList = collect($qrDataList); // chunk 10 per halaman

        $pdf = Pdf::loadView('apar.qrexports_pdf', [
            'qrList' => $qrDataList,
            'batch' => $batch,
        ])->setPaper('A4', 'portrait');

        return $pdf->download("qr_apar_batch{$batch}.pdf");
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
    public function previewImport(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls,csv',
        ]);
        $collection = Excel::toCollection(null, $request->file('file'))->first();

        $data = $collection->skip(1)->map(function ($row, $index) {
            return [
                'no'         => $index + 1,
                'kode_apar'  => $row[0],
                'lokasi'     => $row[1],
                'jenis'      => $row[2],
                'size'       => $row[3],
                'errors'     => $this->validateRow($row),
            ];
        });

        return Inertia::render('fire-safety/apar/PreviewExcel', [
            'items' =>  $data->values()->toArray(),
        ]);
    }
    public function import(Request $request)
    {
        $items = $request->validate([
            'items' => 'required|array',
        ])['items'];

        foreach ($items as $item) {
            if (!empty($item['errors'])) continue;

            Apar::create([
                'kode_apar' => $item['kode_apar'],
                'lokasi'    => $item['lokasi'],
                'jenis'     => $item['jenis'],
                'size'      => $item['size'],
                'user_id'   => auth()->id(),
            ]);
        }

        return redirect()->route('apar.index')->with('success', 'Data berhasil diimpor!');
    }
    public function downloadTemplate(): StreamedResponse
    {
        $headers = ['Content-Type' => 'text/csv'];
        $content = "kode_apar,lokasi,jenis,size\nAPAR001,Lantai 1 - Server,CO2,6\n";
        return response()->streamDownload(fn() => print($content), 'template_apar.csv', $headers);
    }

    private function validateRow($row)
    {
        $validJenis = ['CO2', 'Powder', 'Foam', 'Air'];
        $errors = [];

        if (!$row[0]) $errors[] = 'Kode kosong';
        if (!$row[1]) $errors[] = 'Lokasi kosong';
        if (!in_array($row[2], $validJenis)) $errors[] = 'Jenis tidak valid';
        if (!is_numeric($row[3])) $errors[] = 'Size harus angka';

        // Cek kode_apar unik di DB
        if (Apar::where('kode_apar', $row[0])->exists()) {
            $errors[] = 'Kode sudah terdaftar';
        }

        return $errors;
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
