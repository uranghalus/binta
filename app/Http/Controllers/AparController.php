<?php

namespace App\Http\Controllers;

use App\Models\Apar;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;

class AparController extends Controller implements HasMiddleware
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
    public function show(Apar $apar)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Apar $apar)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Apar $apar)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Apar $apar)
    {
        //
    }
}
