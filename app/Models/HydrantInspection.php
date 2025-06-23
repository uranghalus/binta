<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HydrantInspection extends Model
{
    //
    protected $table = 'hydrant_inspections';

    protected $fillable = [
        'hydrant_id',
        'user_id',
        'regu',
        'selang_hydrant',
        'noozle_hydrant',
        'kaca_box_hydrant',
        'tanggal_inspeksi',
    ];

    public function hydrant(): BelongsTo
    {
        return $this->belongsTo(Hydrant::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
