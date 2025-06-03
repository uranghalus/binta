import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { Role, roleListScheme } from '../data/scheme';

interface Props {
    currentRow?: Role;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}
export default function RoleActionDialog({ currentRow, open, onOpenChange }: Props) {
    const isEdit = !!currentRow;
    const { data, setData, post, put, processing, reset } = useForm({
        id: currentRow?.id || '',
        name: currentRow?.name || '',
    });
    const [zodErrors, setZodErrors] = useState<Record<string, string>>({});
    const handleClose = () => {
        reset();
        setZodErrors({});
        onOpenChange(false);
    };
    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        const result = roleListScheme.safeParse(data);
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
            put(route('role.update', currentRow?.id), {
                onSuccess: handleClose,
            });
        } else {
            post(route('role.store'), {
                onSuccess: handleClose,
            });
        }
    };
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="text-left">
                    <DialogTitle>{isEdit ? 'Edit Role' : 'Add New Role'}</DialogTitle>
                </DialogHeader>
                <div>
                    <form onSubmit={onSubmit} className="space-y-4 p-0.5">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Role Name</Label>
                            <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                            {zodErrors.name && <p className="text-sm text-red-500">{zodErrors.name}</p>}
                        </div>

                        <DialogFooter>
                            <Button variant="secondary" type="button" onClick={handleClose} disabled={processing}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing} className="ml-auto">
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
