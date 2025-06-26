import { z } from 'zod';

export const departmentSchema = z.object({
    id: z.string().optional(),
    department_code: z.string().min(1, 'Kode departemen wajib diisi'),
    name: z.string().min(1, 'Nama departemen wajib diisi'),
    office: z
        .object({
            office_code: z.string().optional(),
            name: z.string().optional(),
        })
        .optional(),
});

export interface Department {
    id: string;
    department_code: string;
    name: string;
    office: { office_code: string; name: string };
}
// export type Department = z.infer<typeof departmentSchema>;
