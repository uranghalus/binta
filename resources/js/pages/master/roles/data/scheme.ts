import { z } from 'zod';

const roleScheme = z.object({
    id: z.number().optional(),
    name: z.string().min(1, { message: 'Name is required' }),
});
export type Role = z.infer<typeof roleScheme>;
export const roleListScheme = z.array(roleScheme);
