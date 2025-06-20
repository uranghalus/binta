import { usePage } from '@inertiajs/react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type AuthProps = {
    permissions: Record<string, boolean>;
};

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export function toISODate(date: Date | null | undefined): string | null {
    if (!date) return null;
    return date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
}

// format untuk ditampilkan ke user
export function toDisplayDate(date: string | null | undefined) {
    if (!date) return '';
    const parsed = new Date(date);
    return parsed.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}
export function formatDate(date: Date | undefined) {
    if (!date) return '';
    return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}
export function isValidDate(date: Date | undefined) {
    if (!date) {
        return false;
    }
    return !isNaN(date.getTime());
}

export default function HasAnyPermission(permissions: string[]): boolean {
    const { auth } = usePage<{ auth: AuthProps }>().props;

    const allPermissions = auth.permissions;

    return permissions.some((permission) => allPermissions[permission]);
}
