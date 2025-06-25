<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Apar extends Model
{
    //
    use HasFactory;

    protected $table = 'apar';

    protected $fillable = [
        'kode_apar',
        'lokasi',
        'jenis',
        'size',
        'user_id',
    ];

    // Relasi ke user (yang bertanggung jawab atas APAR, jika ada)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relasi ke inspeksi APAR
    public function inspections()
    {
        return $this->hasMany(AparInspection::class);
    }
    public function lastInspection()
    {
        return $this->hasOne(AparInspection::class)->latestOfMany('tanggal_inspeksi');
    }
}
