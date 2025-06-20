<?php

namespace App\Http\Controllers;

use App\Models\Hydrant;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;

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
        $hydrantdata = Hydrant::with('user')->get();
        return Inertia::render('fire-safety/hydrant/index', [
            'hydrantdata' => $hydrantdata,
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
    public function show(Hydrant $hydrant)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Hydrant $hydrant)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Hydrant $hydrant)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Hydrant $hydrant)
    {
        //
    }
}
