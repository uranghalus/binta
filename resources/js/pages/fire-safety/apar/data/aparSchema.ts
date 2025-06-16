export interface Apar {
    id: number;
    kode_apar: string;
    lokasi: string;
    jenis: 'CO2' | 'Powder' | 'Foam' | 'Air';
    size: '2 kg' | '4 kg' | '6 kg' | '9 kg';
    user_id: number | null;
    created_at: string;
    updated_at: string;
    // Optional: relasi jika kamu kirim data user atau inspeksi sekaligus
    user?: {
        id: number;
        name: string;
        // tambahkan field lain sesuai user
    };

    // inspections?: AparInspection[]; // Jika ada relasi inspeksi
}
