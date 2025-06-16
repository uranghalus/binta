<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AparInspection extends Model
{
    //
    use HasFactory;

    protected $table = 'apar_inspections';

    protected $fillable = [
        'apar_id',
        'user_id',
        'regu',
        'tanggal_kadaluarsa',
        'kondisi',
        'catatan',
        'foto_apar',
        'tanggal_inspeksi',
    ];

    // Relasi ke APAR
    public function apar()
    {
        return $this->belongsTo(Apar::class);
    }

    // Relasi ke user (pemeriksa)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
