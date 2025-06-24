<?php

namespace Database\Seeders;

use App\Models\Hydrant;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class HydrantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $userIds = User::pluck('id')->toArray();

        for ($i = 1; $i <= 30; $i++) {
            Hydrant::create([
                'kode_unik'    => 'HYD-' . strtoupper(Str::random(6)),
                'kode_hydrant' => 'H-' . str_pad($i, 3, '0', STR_PAD_LEFT),
                'tipe'         => fake()->randomElement(['Indoor', 'Outdoor']),
                'lokasi'       => fake()->randomElement([
                    'Lobi Utama',
                    'Gudang 1',
                    'Lantai 2',
                    'Parkiran Belakang',
                    'Ruang Server'
                ]),
                'user_id'      => fake()->randomElement($userIds),
            ]);
        }
    }
}
