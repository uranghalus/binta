<?php

namespace Database\Seeders;

use App\Models\Apar;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Str;

class AparSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::pluck('id')->toArray();

        for ($i = 1; $i <= 20; $i++) {
            Apar::create([
                'kode_apar' => 'APAR-' . strtoupper(\Illuminate\Support\Str::random(5)),
                'lokasi'    => fake()->randomElement(['Gudang', 'Kantor Utama', 'Lantai 1', 'Lantai 2']),
                'jenis'     => fake()->randomElement(['CO2', 'Powder', 'Foam', 'Air']),
                'size'      => fake()->randomElement([3, 6, 9]),
                'user_id'   => fake()->randomElement($users),
            ]);
        }
    }
}
