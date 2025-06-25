import { PermissionSchema } from '@/pages/role-management/permission/data/permissionSchema';
export interface IRole {
    id?: number;
    name: string;
    permissions: PermissionSchema[]; // ← harus plural
}
