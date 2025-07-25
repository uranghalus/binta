<?php

namespace App\Http\Controllers;

use App\Models\Apar;
use App\Models\AparInspection;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AparInspectionController extends Controller implements HasMiddleware
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
        $aparInspections = AparInspection::with(['apar', 'user.karyawan'])->get();
        return Inertia::render('fire-safety/inspection/apar/index', [
            'aparInspections' => $aparInspections,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $AparData = Apar::all();
        return Inertia::render('fire-safety/inspection/apar/Create', [
            'aparData' => $AparData,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'apar_id'            => ['required', 'exists:apar,id'],
            'regu'               => ['required', 'in:REGU A,REGU B,REGU C,MIDDLE'],
            'tanggal_kadaluarsa' => ['nullable', 'date'],
            'tanggal_refill'     => ['nullable', 'date'],
            'kondisi'            => ['nullable', 'string', 'max:150'],
            'catatan'            => ['nullable', 'string'],
            'foto_apar'          => ['nullable', 'image', 'max:2048'],
        ]);

        // Ubah regu ke format DB (Regu A, Regu B, dst)
        $validated['regu'] = str_replace('REGU ', 'Regu ', $validated['regu']);

        if ($request->hasFile('foto_apar')) {
            $validated['foto_apar'] = $request->file('foto_apar')->store('apar-inspections', 'public');
        }
        $user = Auth::user();

        $validated['user_id'] = $user->id;

        $inspection = AparInspection::create($validated);

        return redirect()->route('inspection.apar.index')->with('success', 'Data berhasil ditambahkan!');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
        $inspection = AparInspection::with(['apar', 'user.karyawan'])->findOrFail($id);
        if (!$inspection) {
            return redirect()->back()->with('error', 'Data not found.');
        }
        return Inertia::render('fire-safety/inspection/apar/Show', [
            'aparData' => $inspection
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        //
        $inspection = AparInspection::with(['apar', 'user.karyawan'])->findOrFail($id);
        $aparData = Apar::all(['id', 'kode_apar', 'lokasi']);

        return Inertia::render('fire-safety/inspection/apar/Edit', [
            'aparInspection' => $inspection,
            'aparData' => $aparData,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
        $aparInspection = AparInspection::with(['apar', 'user.karyawan'])->findOrFail($id);
        $validated = $request->validate([
            'apar_id'            => ['required', 'exists:apar,id'],
            'regu'               => ['required', 'in:REGU A,REGU B,REGU C,MIDDLE'],
            'tanggal_kadaluarsa' => ['nullable', 'date'],
            'tanggal_refill'     => ['nullable', 'date'],
            'kondisi'            => ['nullable', 'string', 'max:150'],
            'catatan'            => ['nullable', 'string'],
            'foto_apar'          => ['nullable', 'image', 'max:2048'],
        ]);

        $validated['regu'] = str_replace('REGU ', 'Regu ', $validated['regu']);

        // Jika user ganti foto, hapus yang lama dan simpan yang baru
        if ($request->hasFile('foto_apar')) {
            if ($aparInspection->foto_apar && Storage::disk('public')->exists("apar-inspections/{$aparInspection->foto_apar}")) {
                Storage::disk('public')->delete("apar-inspections/{$aparInspection->foto_apar}");
            }


            $validated['foto_apar'] = $request->file('foto_apar')->store('apar-inspections', 'public');
        }

        $aparInspection->update($validated);

        return redirect()->route('inspection.apar.index')->with('success', 'Data berhasil diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $aparInspection = AparInspection::findOrFail($id);

        // Hapus file foto jika ada
        if ($aparInspection->foto_apar && Storage::disk('public')->exists($aparInspection->foto_apar)) {
            Storage::disk('public')->delete($aparInspection->foto_apar);
        }

        // Hapus data dari database
        $aparInspection->delete();

        return redirect()->route('inspection.apar.index')->with('success', 'Data berhasil dihapus!');
    }
    public function rekap(Request $request)
    {
        $bulan = $request->input('bulan', now()->format('m'));
        $tahun = $request->input('tahun', now()->format('Y'));
        $rekap = AparInspection::with(['apar', 'user.karyawan'])
            ->whereMonth('tanggal_inspeksi', $bulan)
            ->whereYear('tanggal_inspeksi', $tahun)
            ->orderByDesc('tanggal_inspeksi')
            ->get();
        return Inertia::render('Laporan/apar-rekap', [
            'rekap' => $rekap,
            'bulan' => $bulan,
            'tahun' => $tahun,
        ]);
    }
    public function exportPdf(Request $request)
    {
        $bulan = $request->input('bulan', now()->format('m'));
        $tahun = $request->input('tahun', now()->format('Y'));

        $rekap = AparInspection::with(['apar', 'user.karyawan'])
            ->whereMonth('tanggal_inspeksi', $bulan)
            ->whereYear('tanggal_inspeksi', $tahun)
            ->orderByDesc('tanggal_inspeksi')
            ->get();

        $pdf = Pdf::loadView('report.rekap_apar', compact('rekap', 'bulan', 'tahun'));
        return $pdf->download("rekap_apar_{$bulan}_{$tahun}.pdf");
    }
}
