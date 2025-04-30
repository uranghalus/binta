import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface Karyawan {
    id_karyawan: number;
    nama: string;
    nama_alias: string;
    call_sign: string;
    nik: string;
    no_ktp: string;
    alamat: string;
    telp: string;
    gender: 'L' | 'P'; // "L" = Laki-laki, "P" = Perempuan
    jabatan: string;
    status_karyawan: string;
    tmk: string; // Tanggal Masuk Kerja (format: YYYY-MM-DD)
    keterangan: string;
    department_id: number;
    user_image: string | null;
    create_date: string;
    create_id_user: number | null;
    modified_date: string | null;
    modified_id_user: number | null;
    created_at: string;
    updated_at: string;
}
export interface Role {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}
export interface User {
    id: number;
    karyawan: Karyawan;
    role: Role;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
