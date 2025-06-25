<?php

namespace Database\Seeders;

use App\Models\Departments;
use App\Models\Karyawan;
use App\Models\Office;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class InitialUserSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Buat Office
        $office = Office::firstOrCreate([
            'office_code' => 'DM01',
            'name' => 'Dutamall Banjarmasin',
            'address' => 'Jl. Jendral Sudirman No.123, Banjarmasin',
        ]);

        // 2. Buat Department
        $department = Departments::firstOrCreate([
            'department_code' => 'IT01',
            'name' => 'IT Support',
            'office_id' => $office->id,
        ]);

        // 3. Buat Permissions dasar (jika belum ada)
        $permissions = [
            // Users
            'users index',
            'users create',
            'users edit',
            'users delete',
            // Roles
            'roles index',
            'roles create',
            'roles edit',
            'roles delete',
            // Permissions
            'permissions index',
            'permissions create',
            'permissions edit',
            'permissions delete',
        ];

        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['name' => $perm, 'guard_name' => 'web']);
        }

        // 4. Buat Role Admin dan Petugas
        $adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        $petugasRole = Role::firstOrCreate(['name' => 'petugas', 'guard_name' => 'web']);

        // 5. Assign semua permission ke admin
        $adminRole->syncPermissions(Permission::all());

        // 6. Assign hanya index & create permission ke petugas
        $petugasPermissions = Permission::where(function ($query) {
            $query->where('name', 'like', '% index')
                ->orWhere('name', 'like', '% create');
        })->get();

        $petugasRole->syncPermissions($petugasPermissions);

        // 7. Buat Karyawan Admin
        $adminKaryawan = Karyawan::create([
            'nik' => 'IT001',
            'nama' => 'Muhammad Fauzan',
            'nama_alias' => 'Fauzan',
            'gender' => 'L',
            'alamat' => 'Jl. Lambung Mangkurat, Banjarmasin',
            'no_ktp' => '6371000000000002',
            'telp' => '081234567890',
            'department_id' => $department->id,
            'jabatan' => 'IT Support',
            'call_sign' => 'FAUZAN',
            'tmk' => now()->subYears(2),
            'status_karyawan' => 'aktif',
            'keterangan' => 'Staff IT utama',
            'user_image' => null,
            'create_date' => now(),
        ]);

        $adminUser = User::create([
            'karyawan_id' => $adminKaryawan->id_karyawan,
            'email' => 'fauzan@dutamall.com',
            'password' => Hash::make('admin123'),
        ]);
        $adminUser->assignRole($adminRole);

        // 8. Buat Karyawan Petugas
        $petugasKaryawan = Karyawan::create([
            'nik' => 'PTG001',
            'nama' => 'Petugas Hydrant',
            'nama_alias' => 'Petugas',
            'gender' => 'L',
            'alamat' => 'Jl. Veteran, Banjarmasin',
            'no_ktp' => '6371000000000001',
            'telp' => '081234567891',
            'department_id' => $department->id,
            'jabatan' => 'Petugas Lapangan',
            'call_sign' => 'PETUGAS1',
            'tmk' => now()->subMonths(6),
            'status_karyawan' => 'aktif',
            'keterangan' => 'Petugas inspeksi hydrant',
            'user_image' => null,
            'create_date' => now(),
        ]);

        $petugasUser = User::create([
            'karyawan_id' => $petugasKaryawan->id_karyawan,
            'email' => 'petugas@dutamall.com',
            'password' => Hash::make('petugas123'),
        ]);
        $petugasUser->assignRole($petugasRole);

        $this->command->info('✅ Admin dan Petugas berhasil dibuat dengan role & permission masing-masing.');
    }
}
