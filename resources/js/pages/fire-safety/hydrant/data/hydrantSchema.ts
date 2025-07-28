import { User } from '@/types';

export interface Hydrant {
    id: number;
    kode_unik: string;
    kode_hydrant: string;
    ukuran: string;
    lantai: string;
    lokasi: string;
    user?: User;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
}
