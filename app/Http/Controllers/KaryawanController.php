<?php

namespace App\Http\Controllers;

use App\Models\Departments;
use App\Models\Karyawan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KaryawanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $karyawans = Karyawan::with('department')->latest()->get();
        $departments = Departments::all(['id', 'name']);
        return Inertia::render('master/karyawan/index', [
            'karyawans' => $karyawans,
            'departments' => $departments,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $departments = Departments::all(['id', 'name']);
        return Inertia::render('master/karyawan/Create', [
            'departments' => $departments,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validatedData = $request->validate([
            'nik' => 'required|string|max:20|unique:tbl_karyawans,nik',
            'nama' => 'required|string|max:100',
            'nama_alias' => 'nullable|string|max:100',
            'gender' => 'required|string|max:10',
            'alamat' => 'nullable|string|max:255',
            'no_ktp' => 'nullable|string|max:20',
            'telp' => 'nullable|string|max:15',
            'department_id' => 'required|exists:departments,id',
            'jabatan' => 'nullable|string|max:100',
            'call_sign' => 'nullable|string|max:50',
            'tmk' => 'nullable|date',
            'status_karyawan' => 'required|string|max:50',
            'keterangan' => 'nullable|string|max:255',
            'user_image' => 'nullable|string|max:255',
        ]);

        Karyawan::create($validatedData);

        return redirect()->back()->with('success', 'Karyawan created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Karyawan $karyawan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Karyawan $karyawan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $karyawan = Karyawan::findOrFail($id);
        if (!$karyawan) {
            return redirect()->back()->with('error', 'Karyawan not found.');
        }
        //
        $validatedData = $request->validate([
            'nik' => 'required|string|max:20|unique:tbl_karyawans,nik,' . $karyawan->id_karyawan . ',id_karyawan',
            'nama' => 'required|string|max:100',
            'nama_alias' => 'nullable|string|max:100',
            'gender' => 'required|string|max:10',
            'alamat' => 'nullable|string|max:255',
            'no_ktp' => 'nullable|string|max:20',
            'telp' => 'nullable|string|max:15',
            'department_id' => 'required|exists:departments,id',
            'jabatan' => 'nullable|string|max:100',
            'call_sign' => 'nullable|string|max:50',
            'tmk' => 'nullable|date',
            'status_karyawan' => 'required|string|max:50',
            'keterangan' => 'nullable|string|max:255',
            'user_image' => 'nullable|string|max:255',
        ]);

        $karyawan->update($validatedData);

        return redirect()->back()->with('success', 'Karyawan updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $karyawan = Karyawan::findOrFail($id);
        if (!$karyawan) {
            return redirect()->back()->with('error', 'Karyawan not found.');
        }

        $karyawan->delete();
        return redirect()->back()->with('success', 'Karyawan deleted successfully.');
    }
}
