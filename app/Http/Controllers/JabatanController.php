<?php

namespace App\Http\Controllers;

use App\Models\Departments;
use App\Models\Jabatan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JabatanController extends Controller
{
    public function index()
    {
        $jabatans = Jabatan::with('department')->get();
        $departments = Departments::all();
        return Inertia::render('Jabatan/Index', [
            'departments' => $departments,
            'jabatans' => $jabatans
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_jabatan' => 'required|string|max:255',
            'department_id' => 'required|exists:tbl_departments,id',
        ]);
        $jabatan = Jabatan::create($validated);
        return response()->json($jabatan, 201);
    }

    public function show($id)
    {
        $jabatan = Jabatan::with('department')->findOrFail($id);
        return Inertia::render('Jabatan/Show', [
            'jabatan' => $jabatan
        ]);
    }

    public function update(Request $request, $id)
    {
        $jabatan = Jabatan::findOrFail($id);
        $validated = $request->validate([
            'nama_jabatan' => 'sometimes|required|string|max:255',
            'department_id' => 'sometimes|required|exists:tbl_departments,id',
        ]);
        $jabatan->update($validated);
        return response()->json($jabatan);
    }

    public function destroy($id)
    {
        $jabatan = Jabatan::findOrFail($id);
        $jabatan->delete();
        return response()->json(null, 204);
    }
}
