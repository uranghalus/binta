<?php

namespace App\Http\Controllers;

use App\Models\Departments;
use App\Models\Jabatan;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;

class JabatanController extends Controller implements HasMiddleware
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
    public function index()
    {
        $jabatans = Jabatan::with('department.office')->get();
        $departments = Departments::all();
        return Inertia::render('master/jabatan/Index', [
            'departments' => $departments,
            'jabatans' => $jabatans
        ]);
    }
    public function create()
    {
        $departments = Departments::all();
        return Inertia::render('master/jabatan/Create', [
            'departments' => $departments,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_jabatan' => 'required|string|max:255',
            'department_id' => 'required|exists:tbl_departments,id',
        ]);
        $jabatan = Jabatan::create($validated);
        return redirect()->back()->with('success', 'Jabatan created successfully.');
    }

    public function show($id)
    {
        $jabatan = Jabatan::with('department')->findOrFail($id);
        return Inertia::render('Jabatan/Show', [
            'jabatan' => $jabatan
        ]);
    }
    public function edit($id)
    {
        $jabatan = Jabatan::with('department')->findOrFail($id);
        $departments = Departments::all();
        return Inertia::render('master/jabatan/Edit', [
            'jabatan' => $jabatan,
            'departments' => $departments,
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
        return redirect()->back()->with('success', 'Jabatan updated successfully.');
    }

    public function destroy($id)
    {
        $jabatan = Jabatan::findOrFail($id);
        $jabatan->delete();
        return redirect()->back()->with('success', 'Jabatan deleted successfully.');
    }
    public function bulkDelete(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:permissions,id',
        ]);

        Jabatan::whereIn('id', $request->ids)->delete();

        return back()->with('success', 'Jabatan berhasil dihapus.');
    }
}
