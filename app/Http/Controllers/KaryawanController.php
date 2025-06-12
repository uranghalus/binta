<?php

namespace App\Http\Controllers;

use App\Models\Departments;
use App\Models\Karyawan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
        $validated = $request->validate([
            'nik'            => 'required|string|max:255',
            'nama'           => 'required|string|max:255',
            'nama_alias'     => 'nullable|string|max:255',
            'gender'         => 'required|in:L,P',
            'alamat'         => 'nullable|string|max:255',
            'no_ktp'         => 'nullable|string|max:255',
            'department_id'  => 'required|exists:tbl_departments,id',
            'jabatan'        => 'nullable|string|max:255',
            'status_karyawan' => 'nullable|in:aktif,tidak_aktif,cuti,resign',
            'tmk'            => 'nullable|date',
            'call_sign'      => 'nullable|string|max:255',
            'keterangan'     => 'nullable|string|max:255',
            'telp'           => 'nullable|string|max:255',
            'user_image'     => 'nullable|image|max:2048', // max 2MB
        ]);

        // Simpan file jika ada
        if ($request->hasFile('user_image')) {
            $path = $request->file('user_image')->store('karyawan', 'public');
            $validated['user_image'] = $path; // Simpan path ke database
        }

        Karyawan::create($validated);

        // return redirect()->route('karyawan.index')->with('success', 'Karyawan berhasil ditambahkan.');

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
    public function edit($id)
    {
        $karyawan = Karyawan::findOrFail($id);
        if (!$karyawan) {
            return redirect()->back()->with('error', 'Karyawan not found.');
        }
        //
        $departments = Departments::all(['id', 'name']);
        return Inertia::render('master/karyawan/Edit', [
            'karyawan' => $karyawan,
            'departments' => $departments,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $karyawan = Karyawan::findOrFail($id);

        // Validasi data
        $validatedData = $request->validate([
            'nik' => 'required|string|max:20|unique:tbl_karyawans,nik,' . $karyawan->id_karyawan . ',id_karyawan',
            'nama' => 'required|string|max:100',
            'nama_alias' => 'nullable|string|max:100',
            'gender' => 'required|string|max:10',
            'alamat' => 'nullable|string|max:255',
            'no_ktp' => 'nullable|string|max:20',
            'telp' => 'nullable|string|max:15',
            'department_id' => 'required|exists:tbl_departments,id',
            'jabatan' => 'nullable|string|max:100',
            'call_sign' => 'nullable|string|max:50',
            'tmk' => 'nullable|date',
            'status_karyawan' => 'required|string|max:50',
            'keterangan' => 'nullable|string|max:255',
            'user_image' => 'nullable|image|max:2048', // max 2MB
        ]);

        // Jika ada file baru yang diunggah, hapus file lama dan simpan file baru
        if ($request->hasFile('user_image')) {
            // Hapus file lama jika ada
            if ($karyawan->user_image && Storage::disk('public')->exists($karyawan->user_image)) {
                Storage::disk('public')->delete($karyawan->user_image);
            }

            // Simpan file baru
            $path = $request->file('user_image')->store('karyawan', 'public');
            $validatedData['user_image'] = $path;
        }

        // Update data karyawan
        $karyawan->update($validatedData);

        return redirect()->route('karyawan.index')->with('success', 'Data karyawan berhasil diperbarui.');
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
