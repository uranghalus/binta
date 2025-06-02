<?php

namespace App\Http\Controllers;

use App\Http\Requests\OfficeRequest;
use App\Models\Office;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class OfficesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $offices = Office::latest()->get();

        return Inertia::render('master/offices/index', [
            'offices' => $offices
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(OfficeRequest $request)
    {
        //
        $validated = $request->validated();
        Office::create($validated);
        return redirect()->route('unit-bisnis.index')->with('success', 'Data kantor berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Office $office)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Office $office)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'office_code' => 'required|string|max:20|unique:tbl_offices,office_code,' . $id,
            // tambah validasi lain sesuai kebutuhan
        ]);

        $unitBisnis = Office::findOrFail($id);

        $unitBisnis->update([
            'name' => $request->name,
            'office_code' => $request->office_code,
            // field lain yang ingin di-update
        ]);

        return redirect()->back()->with('success', 'Unit Bisnis berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): RedirectResponse
    {
        //
        $office = Office::findOrFail($id);
        if (!$office) {
            return redirect()->back()->with('error', 'Data tidak ditemukan.');
        }
        $office->delete();

        return redirect()->back()->with('success', 'Data berhasil dihapus.');
    }
}
