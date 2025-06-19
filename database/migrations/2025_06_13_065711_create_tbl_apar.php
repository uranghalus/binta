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
        Schema::create('apar', function (Blueprint $table) {
            $table->id();
            $table->string('kode_apar', 25)->unique(); // Contoh: "APAR Utama"
            $table->string('lokasi'); // Contoh: "Lantai 1, Ruang Server"
            $table->enum('jenis', ['CO2', 'Powder', 'Foam', 'Air']);
            $table->unsignedTinyInteger('size'); // Misalnya: 2, 4, 6, 9 (dalam kg)
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
        });

        Schema::create('hydrant', function (Blueprint $table) {
            $table->id();
            $table->string('kode_unik')->unique();  // Contoh: "HYD-001"
            $table->string('kode_hydrant', 25)->unique(); // Contoh: "HYD Utama"
            $table->enum('tipe', ['Indoor', 'Outdoor']);
            $table->string('lokasi');
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
        });

        Schema::create('apar_inspections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('apar_id')->constrained('apar')->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null'); // Pemeriksa
            $table->enum('regu', ['Regu A', 'Regu B', 'Regu C', 'MIDDLE'])->default('Regu A');
            $table->date('tanggal_kadaluarsa')->nullable(); // Bisa kosong jika tidak ada
            $table->date('tanggal_refill')->nullable(); // Bisa kosong jika tidak ada
            $table->string('kondisi', 150)->nullable(); // Bisa input bebas
            $table->text('catatan')->nullable();
            $table->string('foto_apar')->nullable(); // Lebih spesifik
            $table->timestamp('tanggal_inspeksi')->default(now());
            $table->timestamps();
        });

        Schema::create('hydrant_inspections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hydrant_id')->constrained('hydrant')->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null'); // Pemeriksa
            $table->enum('regu', ['Regu A', 'Regu B', 'Regu C', 'MIDDLE'])->default('Regu A');
            // Kolom fleksibel untuk input bebas (tanpa enum)
            $table->string('selang_hydrant', 150)->nullable();
            $table->string('noozle_hydrant', 150)->nullable();
            $table->string('kaca_box_hydrant', 150)->nullable();
            $table->timestamp('tanggal_inspeksi')->default(now());
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('apar');
        Schema::dropIfExists('hydrant');
    }
};
