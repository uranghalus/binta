<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jabatan extends Model
{
    use HasFactory;

    protected $table = 'tbl_jabatan';

    protected $fillable = [
        'nama_jabatan',
        'department_id',
    ];

    public function department()
    {
        return $this->belongsTo(Departments::class, 'department_id');
    }
}
