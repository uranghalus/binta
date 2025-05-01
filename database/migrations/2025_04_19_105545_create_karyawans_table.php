<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tbl_karyawans', function (Blueprint $table) {
            $table->id('id_karyawan');
            $table->string('nik')->unique();
            $table->string('nama');
            $table->string('nama_alias')->nullable();
            $table->enum('gender', ['L', 'P']);
            $table->text('alamat');
            $table->string('no_ktp');
            $table->string('telp');
            $table->foreignId('department_id')->constrained('tbl_departments')->onDelete('cascade');
            $table->string('jabatan');
            $table->string('call_sign')->nullable();
            $table->date('tmk'); // tanggal mulai kerja
            $table->string('status_karyawan');
            $table->text('keterangan')->nullable();
            $table->string('user_image')->nullable();
            $table->timestamp('create_date')->nullable();
            $table->unsignedBigInteger('create_id_user')->nullable();
            $table->timestamp('modified_date')->nullable();
            $table->unsignedBigInteger('modified_id_user')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_karyawans');
    }
};
