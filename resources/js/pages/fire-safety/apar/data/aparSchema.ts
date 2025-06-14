export interface Apar {
    id?: number;
    kode_unik: string;
    regu: 'Regu A' | 'Regu B' | 'Regu C' | 'MIDDLE';
    user_id?: number | null;
    kode_apar: string;
    lokasi: string;
    jenis: 'CO2' | 'Powder' | 'Foam' | 'Air';
    size: '2 kg' | '4 kg' | '6 kg' | '9 kg';
    date_refill: string; // ISO date string
    tanggal_expired: string; // ISO date string
    kondisi: string;
    image?: string | null;
    tanggal_pengecekan?: string | null; // ISO date string or null
    created_at?: string;
    updated_at?: string | null;
}
