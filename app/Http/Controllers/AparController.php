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
    public function generateMassQRCode()
    {
        $apar = Apar::all();
        $qrDataList = [];
        foreach ($apar as $item) {
            $url = url('/inspection/apar-inspeksi/' . $item->id);

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
            $qrDataList[] = [
                'kode_apar' => $item->kode_apar,
                'qr_base64' => $base64,
            ];
        }
        $pdf = Pdf::loadView('apar.qrexports_pdf', [
            'qrList' => $qrDataList,
        ])->setPaper('A4', 'portrait');
        return $pdf->download("qr_apar_semua.pdf");
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

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls,csv',
        ]);

        Excel::import(new AparImport, $request->file('file'));

        return redirect()->back()->with('success', 'Data APAR berhasil diimpor!');
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
