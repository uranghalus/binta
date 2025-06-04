import { z } from 'zod';

export const officeSchema = z.object({
    id: z.number().optional(),
    office_code: z.string().min(1, { message: 'Office code is required' }),
    name: z.string().min(1, { message: 'Name is required' }),
    address: z.string().min(1, { message: 'Address is required' }),
});

export type Office = z.infer<typeof officeSchema>;
export const officeListSchema = z.array(officeSchema);
export interface OfficeListSchema {
    id: number;
    office_code: string;
    name: string;
    address: string;
}
