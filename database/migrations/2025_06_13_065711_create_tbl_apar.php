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
            $table->string('kode_unik', 15)->unique();  // Contoh: "APAR-001"
            $table->enum('regu', ['Regu A', 'Regu B', 'Regu C', 'MIDDLE'])->default('Regu A'); // Pilihan regu
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->string('kode_apar', 25)->unique();                // Contoh: "APAR Utama"
            $table->string('lokasi');              // Contoh: "Lantai 1, Ruang Server"
            $table->enum('jenis', ['CO2', 'Powder', 'Foam', 'Air']);
            $table->enum('size', ['2 kg', '4 kg', '6 kg', '9 kg',]);
            $table->date('date_refill');
            $table->date('tanggal_expired');
            $table->string('kondisi')->default('Baik'); // Pilihan kondisi
            $table->string('image', 150)->nullable(); // Menyimpan nama file gambar
            $table->date('tanggal_pengecekan')->nullable(); // Tanggal terakhir pengecekan
            $table->timestamps();
        });
        Schema::create('hydrant', function (Blueprint $table) {
            $table->id();
            $table->string('kode_unik')->unique();  // Contoh: "HYD-001"
            $table->string('kode_hydrant', 25)->unique(); // Contoh: "HYD Utama"
            $table->enum('tipe', ['Indoor', 'Outdoor']);
            $table->string('lokasi');
            $table->string('selang_hydrant')->default('Ada');
            $table->string('noozle_hydrant')->default('Ada');
            $table->string('kaca_hydrant')->default('Bagus');
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
        });
        Schema::create('inspections', function (Blueprint $table) {
            $table->id();
            $table->morphs('inspectable'); // polymorphic: apar, hydrant
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null'); // pemeriksa
            $table->date('tanggal_inspeksi');
            $table->text('catatan')->nullable();
            $table->string('foto')->nullable(); // path file gambar
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
