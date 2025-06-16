<?php

namespace App\Http\Controllers;

use App\Models\Apar;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;

// third party
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Barryvdh\DomPDF\Facade\Pdf;

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
    public function generateQRCode($id)
    {
        $apar = Apar::findOrFail($id);
        $url = url('/apar-inspeksi/' . $apar->kode_apar); // misal: https://localhost:8000/apar-inspeksi/ABC123

        $qrCodeBase64 = QrCode::format('png')->size(200)->generate($url);
        $qrCodeImage = 'data:image/png;base64,' . base64_encode($qrCodeBase64);

        $pdf = Pdf::loadView('apar.qrcode', [
            'qrCodeImage' => $qrCodeImage,
            'kode_apar' => $apar->kode_apar,
        ]);

        return $pdf->download('qrcode-' . $apar->kode_apar . '.pdf');
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
