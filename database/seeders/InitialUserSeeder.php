<?php

namespace Database\Seeders;

use App\Models\Departments;
use App\Models\Karyawan;
use App\Models\Office;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class InitialUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        // 1. Buat Office
        $office = Office::firstOrCreate(
            [
                'office_code' => 'DM01',
                'name' => 'Dutamall Banjarmasin',
                'address' => 'Jl. Jendral Sudirman No.123, Banjarmasin'
            ]
        );

        // 2. Buat Department
        $department = Departments::firstOrCreate(
            [
                'department_code' => 'IT01',
                'name' => 'IT Support',
                'office_id' => $office->id
            ]
        );

        // 3. Buat Role


        // 4. Buat Karyawan
        $karyawan = Karyawan::create([
            'nik' => 'IT001',
            'nama' => 'Muhammad Fauzan',
            'nama_alias' => 'Fauzan',
            'gender' => 'L',
            'alamat' => 'Jl. Lambung Mangkurat, Banjarmasin',
            'no_ktp' => '6371xxxxxxxxxxxx',
            'telp' => '081234567890',
            'department_id' => $department->id,
            'jabatan' => 'IT Support',
            'call_sign' => 'FAUZAN',
            'tmk' => now()->subYears(2), // Tanggal mulai kerja
            'status_karyawan' => 'aktif',
            'keterangan' => 'Staff IT utama',
            'user_image' => null,
            'create_date' => now(),
            'create_id_user' => null,
            'modified_date' => null,
            'modified_id_user' => null,
        ]);

        // 5. Buat User login
        $user = User::create([
            'karyawan_id' => $karyawan->id_karyawan,
            'email' => 'fauzan@dutamall.com',
            'password' => 'admin123', // Ganti jika perlu
        ]);
        $permisssion = Permission::all();
        $role = Role::find(1);
        $role->syncPermissions($permisssion);
        $user->assignRole($role);
    }
}
