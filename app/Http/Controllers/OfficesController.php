<?php

namespace App\Http\Controllers;

use App\Http\Requests\OfficeRequest;
use App\Models\Office;
use Illuminate\Http\Request;
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
    public function update(Request $request, Office $office)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Office $office)
    {
        //
    }
}
