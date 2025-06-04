import { z } from 'zod';

export const roleSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, 'Role name is required'),
});

export type Role = z.infer<typeof roleSchema>;
export const rolesListSchema = z.array(roleSchema);
