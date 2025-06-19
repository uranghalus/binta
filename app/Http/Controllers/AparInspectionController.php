<?php

namespace App\Http\Controllers;

use App\Models\Apar;
use App\Models\AparInspection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AparInspectionController extends Controller
{
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
    public function show(AparInspection $aoarInspection)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AparInspection $aoarInspection)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AparInspection $aoarInspection)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AparInspection $aoarInspection)
    {
        //
    }
}
