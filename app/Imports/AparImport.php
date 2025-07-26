<?php

namespace App\Imports;

use App\Models\Apar;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class AparImport implements ToModel, WithHeadingRow
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new Apar([
            //
            'kode_apar' => $row['kode_apar'],
            'lokasi'    => $row['lokasi'],
            'jenis'     => $row['jenis'],
            'size'      => $row['size'],
            'user_id'   => auth()->id(), // jika ingin menyimpan user yg mengupload
        ]);
    }
}
