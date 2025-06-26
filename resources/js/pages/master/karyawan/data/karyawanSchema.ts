import { z } from 'zod';

export const karyawanSchema = z.object({
    id: z.string().optional(),

    nik: z.string().min(1, 'NIK wajib diisi').max(255, 'NIK maksimal 255 karakter'),
    nama: z.string().min(1, 'Nama wajib diisi').max(255, 'Nama maksimal 255 karakter'),
    nama_alias: z.string().max(255, 'Nama alias maksimal 255 karakter').optional(),

    gender: z.enum(['L', 'P'], {
        errorMap: () => ({ message: 'Jenis kelamin harus "L" atau "P"' }),
    }),

    alamat: z.string().max(255, 'Alamat maksimal 255 karakter').optional(),
    no_ktp: z.string().max(255, 'Nomor KTP maksimal 255 karakter').optional(),
    telp: z.string().max(255, 'Nomor telepon maksimal 255 karakter').optional(),

    // cukup simpan id saja – objek departemen opsional
    department_id: z.number({ required_error: 'Departemen wajib dipilih' }).int().positive(),
    department: z
        .object({
            department_code: z.string().optional(),
            name: z.string().optional(),
        })
        .optional(),

    jabatan: z.string().max(255, 'Jabatan maksimal 255 karakter').optional(),

    call_sign: z.string().max(255, 'Call sign maksimal 255 karakter').optional(),

    tmk: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), {
            message: 'Tanggal harus dalam format YYYY-MM-DD',
        })
        .optional(),

    status_karyawan: z.enum(['aktif', 'tidak_aktif', 'cuti', 'resign'], {
        errorMap: () => ({ message: 'Status karyawan tidak valid' }),
    }),

    keterangan: z.string().max(255, 'Keterangan maksimal 255 karakter').optional(),

    user_image: z
        .instanceof(File, { message: 'File gambar wajib di-upload' })
        .refine((f) => f.size <= 2 * 1024 * 1024, 'Ukuran file maksimal 2 MB')
        .refine((f) => ['image/jpeg', 'image/png', 'image/jpg'].includes(f.type), 'Format harus JPEG/PNG')
        .optional(),
});

export interface Karyawan {
    id_karyawan?: string;

    nik: string;
    nama: string;
    nama_alias?: string;

    gender: 'L' | 'P';

    alamat?: string;
    no_ktp?: string;
    telp?: string;

    department_id: number;
    department?: {
        department_code?: string;
        name?: string;
    };

    jabatan?: string;
    call_sign?: string;

    tmk?: string; // diasumsikan ISO string (YYYY-MM-DD)

    status_karyawan: 'aktif' | 'tidak_aktif' | 'cuti' | 'resign';

    keterangan?: string;

    user_image?: File;
}
