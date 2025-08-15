<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CPInspection extends Model
{
    //
    protected $table = 'patroli_security';

    protected $fillable = [
        'kode_cp',
        'user_id',
        'regu',
        'kondisi',
        'bocoran',
        'penerangan_lampu',
        'kerusakan_fasum',
        'potensi_bahaya_api',
        'potensi_bahaya_keorang',
        'orang_mencurigakan',
        'tanggal_patroli',
    ];

    protected $casts = [
        'tanggal_patroli' => 'datetime',
    ];

    // Relasi ke tabel cek_point_security
    public function cekPoint()
    {
        return $this->belongsTo(CekPointSecurity::class, 'kode_cp');
    }

    // Relasi ke tabel users
    public function pemeriksa()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
