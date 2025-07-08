<?php

namespace App\Http\Controllers;

use App\Models\Hydrant;
use App\Models\HydrantInspection;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HydrantInspectionController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('permission:permissions index', only: ['index']),
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
        $inspections = HydrantInspection::with(['hydrant', 'user.karyawan'])->latest()->get();
        return Inertia::render('fire-safety/inspection/hydrant/Index', [
            'inspections' => $inspections,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $hydrants = Hydrant::all();
        return Inertia::render('fire-safety/inspection/hydrant/Create', [
            'hydrants' => $hydrants,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'hydrant_id' => 'required|exists:hydrant,id',
            'regu' => 'required|string|max:50',
            'selang_hydrant' => 'required|string|max:255',
            'noozle_hydrant' => 'required|string|max:255',
            'kaca_box_hydrant' => 'required|string|max:255',
        ]);
        $user = Auth::user();

        $validated['user_id'] = $user->id;
        HydrantInspection::create($validated);

        return redirect()->route('inspection.hydrant.index')->with('success', 'Inspeksi Hydrant berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(HydrantInspection $hydrantInspection)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        //
        $inspections = HydrantInspection::with(['hydrant', 'user.karyawan'])->findOrFail($id);
        $hydrants = Hydrant::all();
        return Inertia::render('fire-safety/inspection/hydrant/Edit', [
            'inspection' => $inspections,
            'hydrants' => $hydrants,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'hydrant_id' => 'required|exists:hydrant,id',
            'regu' => 'required|string|max:50',
            'selang_hydrant' => 'required|string|max:255',
            'noozle_hydrant' => 'required|string|max:255',
            'kaca_box_hydrant' => 'required|string|max:255',
        ]);

        $inspection = HydrantInspection::findOrFail($id);
        $inspection->update($validated);

        return redirect()->route('inspection.hydrant.index')->with('success', 'Inspeksi Hydrant berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        $inspection = HydrantInspection::findOrFail($id);
        $inspection->delete();
        return redirect()->route('inspection.hydrant.index')->with('success', 'Data berhasil dihapus!');
    }
    public function rekap(Request $request)
    {
        $bulan = $request->input('bulan', now()->format('m'));
        $tahun = $request->input('tahun', now()->format('Y'));

        $rekap = HydrantInspection::with(['hydrant', 'user'])
            ->whereMonth('tanggal_inspeksi', $bulan)
            ->whereYear('tanggal_inspeksi', $tahun)
            ->orderByDesc('tanggal_inspeksi')
            ->get();

        return inertia('Laporan/hydrant-rekap', [
            'rekap' => $rekap,
            'bulan' => $bulan,
            'tahun' => $tahun,
        ]);
    }
}
