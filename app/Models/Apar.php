<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Apar extends Model
{
    //
    protected $table = 'apar';
    protected $fillable = [
        'kode_unik',
        'regu',
        'user_id',
        'kode_apar',
        'lokasi',
        'jenis',
        'size',
        'date_refill',
        'tanggal_expired',
        'kondisi',
        'image',
        'tanggal_pengecekan',
    ];

    /**
     * Relasi ke user (petugas/penanggung jawab)
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
