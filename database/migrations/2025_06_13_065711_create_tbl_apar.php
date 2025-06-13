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
        Schema::create('tbl_apar', function (Blueprint $table) {
            $table->id();
            $table->string('kode_unik')->unique();  // Contoh: "APAR-001"
            $table->string('lokasi');              // Contoh: "Lantai 1, Ruang Server"
            $table->enum('jenis', ['CO2', 'Powder', 'Foam', 'Air']);
            $table->date('tanggal_expired');
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
        });
        Schema::create('tbl_hydrant', function (Blueprint $table) {
            $table->id();
            $table->string('kode_unik')->unique();  // Contoh: "HYD-001"
            $table->string('lokasi');
            $table->enum('tipe', ['Indoor', 'Outdoor']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_apar');
    }
};
