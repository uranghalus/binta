import { z } from 'zod';
import { officeSchema } from '../../offices/data/scheme';

export const departmentSchema = z.object({
    id: z.number(),
    department_code: z.string().min(1, 'Kode departemen wajib diisi'),
    name: z.string().min(1, 'Nama departemen wajib diisi'),
    office_id: z.number(),
    office: officeSchema.optional(), // <<-- Tambahkan ini
});

export type Department = z.infer<typeof departmentSchema>;
export type DepartmentListSchema = z.infer<typeof departmentSchema>;
export interface DepartmentInter {
    id: number;
    department_code: string;
    name: string;
    office_id: number;
    office?: {
        id: number;
        name: string;
        office_code: string;
        address: string;
    };
}
