import { z } from 'zod';

export const karyawanSchema = z.object({
    id: z.string().optional(),
    nik: z.string().min(1, 'NIK wajib diisi').max(255, 'NIK maksimal 255 karakter'),
    nama: z.string().min(1, 'Nama wajib diisi').max(255, 'Nama maksimal 255 karakter'),
    nama_alias: z.string().max(255, 'Nama alias maksimal 255 karakter').optional(),
    gender: z.enum(['L', 'P']).refine((value) => ['L', 'P'].includes(value), {
        message: 'Jenis kelamin harus berupa "male" atau "female"',
    }),
    alamat: z.string().max(255, 'Alamat maksimal 255 karakter').optional(),
    no_ktp: z.string().max(255, 'Nomor KTP maksimal 255 karakter').optional(),
    telp: z.string().max(255, 'Nomor telepon maksimal 255 karakter').optional(),
    department_id: z.number().int().positive('ID departemen harus berupa bilangan bulat positif'),
    department: z.object({
        department_code: z.string().optional(),
        name: z.string().optional(),
    }),
    jabatan: z.string().max(255, 'Jabatan maksimal 255 karakter').optional(),
    call_sign: z.string().max(255, 'Call sign maksimal 255 karakter').optional(),
    tmk: z
        .string()
        .nullable()
        .refine((value) => value === null || !isNaN(Date.parse(value)), {
            message: 'Tanggal masuk kerja harus berupa tanggal yang valid',
        }),
    status_karyawan: z.enum(['aktif', 'nonaktif']).refine((value) => ['aktif', 'nonaktif'].includes(value), {
        message: 'Status karyawan harus berupa "aktif" atau "nonaktif"',
    }),
    keterangan: z.string().max(255, 'Keterangan maksimal 255 karakter').optional(),
    user_image: z.string().max(2048, 'URL gambar maksimal 2048 karakter').optional(),
});

export type Karyawan = z.infer<typeof karyawanSchema>;
