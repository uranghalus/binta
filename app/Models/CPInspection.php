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
        'foto_kondisi',
        'bocoran',
        'foto_bocoran',
        'penerangan_lampu',
        'foto_penerangan_lampu',
        'kerusakan_fasum',
        'foto_kerusakan_fasum',
        'potensi_bahaya_api',
        'foto_potensi_bahaya_api',
        'potensi_bahaya_keorang',
        'foto_potensi_bahaya_keorang',
        'orang_mencurigakan',
        'foto_orang_mencurigakan',
        'tanggal_patroli',
    ];

    protected $casts = [
        'tanggal_patroli' => 'datetime',
    ];

    /**
     * Relasi ke cek_point_security
     */
    public function cekPoint()
    {
        return $this->belongsTo(CekPointSecurity::class, 'kode_cp');
    }

    /**
     * Relasi ke user (pemeriksa)
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
