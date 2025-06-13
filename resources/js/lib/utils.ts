import { usePage } from '@inertiajs/react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type Permissions = Record<string, boolean>;

interface AuthProps {
    permissions: Permissions;
}

interface PageProps {
    auth: AuthProps;
    [key: string]: unknown; // Add index signature to satisfy the constraint
}

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

export default function useHasAnyPermission(permissions: string[]): boolean {
    // destruct auth from usePage props
    const { auth } = usePage<PageProps>().props;

    // get all permissions from props auth
    const allPermissions = auth.permissions;

    // define has permission is false
    let hasPermission = false;

    // loop permissions
    permissions.forEach(function (item) {
        // do it if permission is match with key
        if (allPermissions[item]) {
            // assign hasPermission to true
            hasPermission = true;
        }
    });

    return hasPermission;
}
