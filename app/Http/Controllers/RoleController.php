<?php

namespace App\Http\Controllers;

use App\Models\Roles;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $roles = Roles::latest()->get();
        return Inertia::render('master/roles/index', [
            'roles' => $roles
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'name' => 'required|string|max:255',
        ]);
        Roles::create([
            'name' => $request->name,
        ]);
        return redirect()->back()->with('success', 'Role created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Roles $roles)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Roles $roles)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $roles = Roles::findOrFail($id);
        if (!$roles) {
            return redirect()->back()->with('error', 'Role not found.');
        }
        //
        $request->validate([
            'name' => 'required|string|max:255',
        ]);
        $roles->update([
            'name' => $request->name,
        ]);
        return redirect()->back()->with('success', 'Role updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        $roles = Roles::findOrFail($id);
        if (!$roles) {
            return redirect()->back()->with('error', 'Role not found.');
        }

        $roles->delete();
        return redirect()->back()->with('success', 'Role deleted successfully.');
    }
}
