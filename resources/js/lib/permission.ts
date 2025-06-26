/* eslint-disable react-hooks/rules-of-hooks */
import { User } from '@/types';
import { usePage } from '@inertiajs/react';

// Definisikan tipe untuk props auth
interface AuthProps {
    permissions: Record<string, boolean>;
    user?: User;
}

// Definisikan tipe untuk page props
interface PageProps {
    auth: AuthProps;
    [key: string]: unknown; // Add index signature to satisfy Inertia PageProps constraint
}

/**
 * Check if user has any of the specified permissions
 * @param permissions Array of permission strings to check
 * @returns boolean indicating if user has any of the permissions
 */
export default function HasAnyPermission(permissions: string[]): boolean {
    const { auth } = usePage<PageProps>().props;

    // Handle case where auth or permissions is undefined
    if (!auth || !auth.permissions) {
        if (process.env.NODE_ENV === 'development') {
            console.warn('Auth permissions not found - make sure ShareUserPermissions middleware is properly set up');
        }
        return false;
    }

    const allPermissions = auth.permissions;

    // Check for wildcard permission
    if (allPermissions['*']) {
        return true;
    }

    return permissions.some((permission) => allPermissions[permission] === true);
}

// Versi alternatif sebagai custom hook (jika prefer)
export function useAnyPermission(permissions: string[]): boolean {
    return HasAnyPermission(permissions);
}
