import { z } from 'zod';

const officeSchema = z.object({
    office_code: z.string().min(1, { message: 'Office code is required' }),
    name: z.string().min(1, { message: 'Name is required' }),
    address: z.string().min(1, { message: 'Address is required' }),
});

export type Office = z.infer<typeof officeSchema>;
export const officeListSchema = z.array(officeSchema);
