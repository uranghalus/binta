import { Hydrant } from '@/pages/fire-safety/hydrant/data/hydrantSchema';
import { User } from '@/types';

export interface HydrantInspectionsc {
    id: number;
    apar_id: number;
    user_id: number | null;
    regu: 'Regu A' | 'Regu B' | 'Regu C' | 'MIDDLE';
    selang_hydrant: string | null;
    noozle_hydrant: string | null;
    kaca_box_hydrant: string | null;
    tanggal_inspeksi: string; // format: ISO timestamp
    created_at: string;
    updated_at: string;
    // Optional: relasi jika kamu kirim data apar atau user sekaligus
    hydrant?: Hydrant;
    user?: User;
}
