<?php

namespace Database\Seeders;

use App\Models\Departments;
use App\Models\Jabatan;
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

        // 3. Buat Jabatan
        $jabatanIT = Jabatan::updateOrCreate(
            ['nama_jabatan' => 'Staff'],
            ['roles' => ['superadmin']]
        );

        $jabatanPetugas = Jabatan::updateOrCreate(
            ['nama_jabatan' => 'Petugas Lapangan'],
            ['roles' => ['petugas']]
        );

        // 4. Buat Permissions dasar
        $permissions = [
            'users index',
            'users create',
            'users edit',
            'users delete',
            'roles index',
            'roles create',
            'roles edit',
            'roles delete',
            'department index',
            'department create',
            'department edit',
            'department delete',
            'jabatan index',
            'jabatan create',
            'jabatan edit',
            'jabatan delete',
            'unit bisnis index',
            'unit bisnis create',
            'unit bisnis edit',
            'unit bisnis delete',
            'permissions index',
            'permissions create',
            'permissions edit',
            'permissions delete',
        ];

        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['name' => $perm, 'guard_name' => 'web']);
        }

        // 5. Ambil atau buat Role
        $adminRole = Role::firstOrCreate(['name' => 'superadmin', 'guard_name' => 'web']);
        $petugasRole = Role::firstOrCreate(['name' => 'petugas', 'guard_name' => 'web']);

        // 6. Assign permission ke masing-masing role
        $adminRole->syncPermissions(Permission::all());

        $petugasPermissions = Permission::where(function ($query) {
            $query->where('name', 'like', '% index')
                ->orWhere('name', 'like', '% create');
        })->get();
        $petugasRole->syncPermissions($petugasPermissions);

        // 7. Buat Karyawan & User Admin
        $adminKaryawan = Karyawan::firstOrCreate(
            ['nik' => 'IT001'],
            [
                'nama'             => 'Muhammad Fauzan',
                'nama_alias'       => 'Fauzan',
                'gender'           => 'L',
                'alamat'           => 'Jl. Lambung Mangkurat, Banjarmasin',
                'no_ktp'           => '6371000000000002',
                'telp'             => '081234567890',
                'department_id'    => $department->id,
                'jabatan_id'       => $jabatanIT->id,
                'call_sign'        => 'FAUZAN',
                'tmk'              => now()->subYears(2),
                'status_karyawan'  => 'aktif',
                'keterangan'       => 'Staff IT utama',
                'user_image'       => null,
                'create_date'      => now(),
            ]
        );

        $adminUser = User::firstOrCreate(
            ['email' => 'fauzan@dutamall.com'],
            [
                'karyawan_id' => $adminKaryawan->id_karyawan,
                'password'    => Hash::make('admin123'),
            ]
        );
        if ($adminKaryawan->jabatan && $adminKaryawan->jabatan->roles) {
            $adminUser->syncRoles($adminKaryawan->jabatan->roles);
        }

        // 8. Buat Karyawan & User Petugas
        $petugasKaryawan = Karyawan::firstOrCreate(
            ['nik' => 'PTG001'],
            [
                'nama'             => 'Petugas Hydrant',
                'nama_alias'       => 'Petugas',
                'gender'           => 'L',
                'alamat'           => 'Jl. Veteran, Banjarmasin',
                'no_ktp'           => '6371000000000001',
                'telp'             => '081234567891',
                'department_id'    => $department->id,
                'jabatan_id'       => $jabatanPetugas->id,
                'call_sign'        => 'PETUGAS1',
                'tmk'              => now()->subMonths(6),
                'status_karyawan'  => 'aktif',
                'keterangan'       => 'Petugas inspeksi hydrant',
                'user_image'       => null,
                'create_date'      => now(),
            ]
        );

        $petugasUser = User::firstOrCreate(
            ['email' => 'petugas@dutamall.com'],
            [
                'karyawan_id' => $petugasKaryawan->id_karyawan,
                'password'    => Hash::make('petugas123'),
            ]
        );
        if ($petugasKaryawan->jabatan && $petugasKaryawan->jabatan->roles) {
            $petugasUser->syncRoles($petugasKaryawan->jabatan->roles);
        }

        $this->command->info('✅ Admin & Petugas berhasil dibuat beserta jabatan, role, dan permission-nya.');
    }
}
