<?php

namespace App\Imports;

use App\Models\Hydrant;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Support\Facades\Auth;

class HydrantImport implements ToModel, WithHeadingRow
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new Hydrant([
            //
            'kode_unik'     => $row['kode_unik'] ?? \Illuminate\Support\Str::uuid(), // fallback UUID jika tidak ada
            'kode_hydrant'  => $row['kode_hydrant'],
            'ukuran'        => $row['ukuran'],
            'lantai'        => $row['lantai'] ?? null,
            'lokasi'        => $row['lokasi'] ?? null,
            'user_id'       => optional(Auth::user())->id, // atau null jika tidak ingin menyimpan user
        ]);
    }
}
