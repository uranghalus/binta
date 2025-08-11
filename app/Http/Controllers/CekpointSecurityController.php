<?php

namespace App\Http\Controllers;

use App\Models\CekPointSecurity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CekpointSecurityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $cekPointSecurityData = CekPointSecurity::all();
        return Inertia::render('fire-safety/cekpoint-security/Index', [
            'cekPointSecurityData' => $cekPointSecurityData,
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(CekPointSecurity $cekPointSecurity)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CekPointSecurity $cekPointSecurity)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CekPointSecurity $cekPointSecurity)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CekPointSecurity $cekPointSecurity)
    {
        //
    }
}
