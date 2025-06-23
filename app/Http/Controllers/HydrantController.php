<?php

namespace App\Http\Controllers;

use App\Models\Hydrant;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Intervention\Image\Laravel\Facades\Image;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class HydrantController extends Controller implements HasMiddleware
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
        $hydrantdata = Hydrant::with('user.karyawan')->get();
        return Inertia::render('fire-safety/hydrant/index', [
            'hydrantdata' => $hydrantdata,
        ]);
    }

    public function generateQRCode($id)
    {
        $apar = Hydrant::findOrFail($id);
        $url = url('/apar-inspeksi/' . $apar->kode_apar);

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
        $pdf = Pdf::loadView('hydrant.qrcode', [
            'kode_hydrant' => $apar->kode_hydrant,
            'qr_base64' => $base64,
        ])->setPaper('A4');

        return $pdf->download("qr_apar_{$apar->kode_apar}.pdf");
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'kode_unik' => 'required|string|max:255|unique:hydrant,kode_unik',
            'kode_hydrant' => 'required|string|max:255|unique:hydrant,kode_hydrant',
            'tipe' => 'required|in:Indoor,Outdoor',
            'lokasi' => 'required|string|max:255',
            'user_id' => 'nullable|exists:users,id',
        ]);
        $user = Auth::user();

        $validated['user_id'] = $user->id;
        Hydrant::create($validated);

        return redirect()->route('hydrant.index')->with('success', 'Hydrant berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $hydrant = Hydrant::findOrFail($id);
        //
        $validated = $request->validate([
            'kode_unik' => 'required|string|max:255|unique:hydrant,kode_unik,' . $hydrant->id,
            'kode_hydrant' => 'required|string|max:255|unique:hydrant,kode_hydrant,' . $hydrant->id,
            'tipe' => 'required|in:Indoor,Outdoor',
            'lokasi' => 'required|string|max:255',
            'user_id' => 'nullable|exists:users,id',
        ]);

        $hydrant->update($validated);

        return redirect()->route('hydrant.index')->with('success', 'Hydrant berhasil diupdate.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        $hydrant = Hydrant::findOrFail($id);
        $hydrant->delete();

        return redirect()->route('hydrant.index')->with('success', 'Hydrant berhasil dihapus.');
    }
}
