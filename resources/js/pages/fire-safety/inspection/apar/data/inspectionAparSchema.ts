import { User } from '@/types';

export interface AparInspection {
    id: number;
    apar_id: number;
    user_id: number | null;
    regu: 'Regu A' | 'Regu B' | 'Regu C' | 'MIDDLE';
    tanggal_kadaluarsa: string | null; // format: 'YYYY-MM-DD' atau null
    tanggal_refill: string | null;
    kondisi: string | null;
    catatan: string | null;
    foto_apar: string | null;
    tanggal_inspeksi: string; // format: ISO timestamp
    created_at: string;
    updated_at: string;
    foto_apar_url: string;
    // Optional: relasi jika kamu kirim data apar atau user sekaligus
    apar?: {
        id: number;
        kode_apar: string;
        lokasi: string;
        jenis: 'CO2' | 'Powder' | 'Foam' | 'Air';
        size: number;
    };
    user?: User;
}
