import { z } from 'zod';

export const departmentSchema = z.object({
    department_code: z.string().min(1, 'Kode departemen wajib diisi'),
    name: z.string().min(1, 'Nama departemen wajib diisi'),
    office_id: z.number().int().positive('ID kantor harus berupa bilangan bulat positif'),
});

export type Department = z.infer<typeof departmentSchema>;
export type DepartmentListSchema = z.infer<typeof departmentSchema>;
