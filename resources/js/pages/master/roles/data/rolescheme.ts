import { PermissionSchema } from '@/pages/role-management/permission/data/permissionSchema';
import { z } from 'zod';

export const roleSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, 'Role name is required'),
});

export interface IRole {
    id?: number;
    name: string;
    permissions: PermissionSchema[]; // ← harus plural
}
export type Role = z.infer<typeof roleSchema>;
export const rolesListSchema = z.array(roleSchema);
