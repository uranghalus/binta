import { User } from '@/types';

export interface Hydrant {
    id: number;
    kode_unik: string;
    kode_hydrant: string;
    tipe: 'Indoor' | 'Outdoor';
    lokasi: string;
    user?: User;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
}
