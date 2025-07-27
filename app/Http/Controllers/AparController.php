<?php

namespace App\Http\Controllers;

use App\Imports\AparImport;
use App\Models\Apar;
use Barryvdh\DomPDF\Facade\Pdf;
use Barryvdh\Snappy\Facades\SnappyPdf;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Storage;
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
        $perPage = 50;
        $batch = $request->get('batch', 1);
        $offset = ($batch - 1) * $perPage;

        $items = Apar::orderBy('id')->skip($offset)->take($perPage)->get();
        $qrDataList = [];

        foreach ($items as $item) {
            // Generate QR code PNG ke dalam variable (tanpa simpan file)
            $qrPng = QrCode::format('png')
                ->size(150)
                ->generate(url('/inspection/apar-inspeksi/' . $item->id));

            // Encode ke base64
            $base64 = 'data:image/png;base64,' . base64_encode($qrPng);

            $qrDataList[] = [
                'kode_apar' => $item->kode_apar,
                'lokasi' => $item->lokasi->nama_lokasi ?? '-',
                'penempatan' => $item->penempatan->nama_penempatan ?? '-',
                'qr_base64' => $base64,
            ];
        }

        $pdf = SnappyPdf::loadView('apar.qrexports_pdf', ['qrDataList' => $qrDataList])
            ->setPaper('a4')
            ->setOption('enable-local-file-access', true) // Penting kalau pakai gambar lokal
            ->setOption('margin-top', 0)
            ->setOption('margin-bottom', 0)
            ->setOption('margin-left', 0)
            ->setOption('margin-right', 0);

        return $pdf->stream("qr_apar_batch_{$batch}.pdf");
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
