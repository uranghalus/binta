import { Hydrant } from '@/pages/fire-safety/hydrant/data/hydrantSchema';
import { User } from '@/types';

export interface HydrantInspectionsc {
    id: number;
    // hydrant_id: number | null;
    user_id: number | null;
    regu: 'Regu A' | 'Regu B' | 'Regu C' | 'MIDDLE';
    valve_machino_coupling?: string | null;
    fire_hose_machino_coupling?: string | null;
    selang_hydrant?: string | null;
    noozle_hydrant?: string | null;
    kaca_box_hydrant?: string | null;
    kunci_box_hydrant?: string | null;
    box_hydrant?: string | null;
    alarm?: string | null;
    foto_hydrant?: string | null;
    tanggal_inspeksi: string; // ISO timestamp
    created_at: string;
    updated_at: string;
    // Optional: relasi jika kamu kirim data apar atau user sekaligus
    hydrant?: Hydrant;
    user?: User;
}
