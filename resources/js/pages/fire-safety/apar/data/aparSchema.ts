export interface Apar {
    id: number;
    kode_apar: string;
    lantai: string | null;
    lokasi: string;
    jenis: 'CO2' | 'Powder' | 'Foam' | 'Air';
    size: number; // decimal dengan 1 digit di belakang koma
    user_id: number | null;
    created_at: string; // atau Date jika di-parse
    updated_at: string; // atau Date jika di-parse
    // Optional: relasi jika kamu kirim data user atau inspeksi sekaligus
    user?: {
        id: number;
        name: string;
        // tambahkan field lain sesuai user
    };

    // inspections?: AparInspection[]; // Jika ada relasi inspeksi
}
