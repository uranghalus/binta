import { Department } from '../../departments/data/departmentSchema';

export interface Jabatan {
    id: number;
    nama_jabatan: string;
    department_id: number;
    // Optional: relasi department jika ingin digunakan
    department?: Department;
}
