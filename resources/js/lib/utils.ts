import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
export function toTimestamp(date: string | null | undefined): string {
    if (!date) return '';
    const parsed = new Date(date);
    return parsed.toLocaleString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });
}
export function isValidDate(date: Date | undefined) {
    if (!date) {
        return false;
    }
    return !isNaN(date.getTime());
}
