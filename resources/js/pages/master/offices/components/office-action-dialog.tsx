import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Office {
    id: number;
    office_code: string;
    name: string;
    address: string;
}

interface Props {
    currentRow?: Office;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const officeSchema = z.object({
    office_code: z.string().min(1, 'Office code is required'),
    name: z.string().min(1, 'Office name is required'),
    address: z.string().min(1, 'Location is required'),
});

export function OfficeActionDialog({ currentRow, open, onOpenChange }: Props) {
    const isEdit = !!currentRow;

    const { data, setData, post, put, processing, reset } = useForm({
        office_code: currentRow?.office_code || '',
        name: currentRow?.name || '',
        address: currentRow?.address || '',
    });

    const [zodErrors, setZodErrors] = useState<Record<string, string>>({});

    const handleClose = () => {
        reset();
        setZodErrors({});
        onOpenChange(false);
    };

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        const result = officeSchema.safeParse(data);
        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            result.error.errors.forEach((err) => {
                if (err.path[0]) {
                    fieldErrors[err.path[0] as string] = err.message;
                }
            });
            setZodErrors(fieldErrors);
            return;
        }

        setZodErrors({}); // clear previous errors

        if (isEdit) {
            put(route('unit-bisnis.update', currentRow?.id), {
                onSuccess: handleClose,
            });
        } else {
            post(route('unit-bisnis.store'), {
                onSuccess: handleClose,
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="text-left">
                    <DialogTitle>{isEdit ? 'Edit Office' : 'Add New Office'}</DialogTitle>
                </DialogHeader>
                <div>
                    <form onSubmit={onSubmit} className="space-y-4 p-0.5">
                        <div className="grid gap-2">
                            <Label htmlFor="office_code">Office Code</Label>
                            <Input id="office_code" value={data.office_code} onChange={(e) => setData('office_code', e.target.value)} />
                            {zodErrors.office_code && <p className="text-sm text-red-500">{zodErrors.office_code}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Office Name</Label>
                            <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                            {zodErrors.name && <p className="text-sm text-red-500">{zodErrors.name}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="address">Location</Label>
                            <Input id="address" value={data.address} onChange={(e) => setData('address', e.target.value)} />
                            {zodErrors.address && <p className="text-sm text-red-500">{zodErrors.address}</p>}
                        </div>

                        <DialogFooter>
                            <Button type="submit" disabled={processing}>
                                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                Save changes
                            </Button>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
