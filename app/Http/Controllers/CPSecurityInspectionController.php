<?php

namespace App\Http\Controllers;

use App\Models\CekPointSecurity;
use App\Models\CPInspection;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CPSecurityInspectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $patroli = CPInspection::with(['cekPoint', 'pemeriksa.karyawan'])
            ->latest('tanggal_patroli')
            ->paginate(10);

        return Inertia::render('PatroliSecurity/Index', [
            'patroli' => $patroli
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('PatroliSecurity/Create', [
            'cekPoints' => CekPointSecurity::all(),
            'users' => User::select('id', 'name')->get(),
            'reguOptions' => ['PAGI', 'SIANG', 'MALAM', 'MIDDLE']
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'kode_cp' => 'nullable|exists:cek_point_security,id',
            'user_id' => 'nullable|exists:users,id',
            'regu' => 'required|in:PAGI,SIANG,MALAM,MIDDLE',
            'kondisi' => 'nullable|string|max:150',
            'bocoran' => 'nullable|string|max:150',
            'penerangan_lampu' => 'nullable|string|max:150',
            'kerusakan_fasum' => 'nullable|string|max:150',
            'potensi_bahaya_api' => 'nullable|string|max:150',
            'potensi_bahaya_keorang' => 'nullable|string|max:150',
            'orang_mencurigakan' => 'nullable|string|max:150',
            'tanggal_patroli' => 'nullable|date',
        ]);

        CPInspection::create($validated);

        return redirect()->route('patroli-security.index')->with('success', 'Data patroli berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(CPInspection $cPInspection)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CPInspection $cPInspection)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CPInspection $cPInspection)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CPInspection $cPInspection)
    {
        //
    }
}
