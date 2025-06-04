import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { roleSchema } from '../data/rolescheme';

interface Role {
    id?: number;
    name: string;
}
interface Props {
    currentRow?: Role;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}
export default function RoleActionDialog({ onOpenChange, open, currentRow }: Props) {
    const isEdit = !!currentRow;
    const { data, setData, post, put, processing, reset } = useForm({
        id: currentRow?.id,
        name: currentRow?.name || '',
    });
    const [zodError, setZodError] = useState<Record<string, string>>({});
    const handleClose = () => {
        reset();
        setZodError({});
        onOpenChange(false);
    };
    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const result = roleSchema.safeParse(data);
        if (!result.success) {
            const errors: Record<string, string> = {};
            result.error.errors.forEach((error) => {
                if (error.path[0]) {
                    errors[error.path[0]] = error.message;
                }
            });
            setZodError(errors);
            return;
        }
        if (isEdit) {
            put(route('role.update', currentRow?.id), {
                onSuccess: () => {
                    handleClose();
                },
                preserveScroll: true,
            });
        } else {
            post(route('role.store'), {
                onSuccess: () => {
                    handleClose();
                },
                preserveScroll: true,
            });
        }
    };
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="text-left">
                    <DialogTitle>{isEdit ? 'Edit Role' : 'Tambah Role Baru'}</DialogTitle>
                </DialogHeader>
                <div>
                    <form onSubmit={onSubmit} className="space-y-4 p-0.5">
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="text-sm font-medium">
                                Nama Role
                            </Label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={`input ${zodError.name ? 'input-error' : ''}`}
                            />
                            {zodError.name && <p className="text-xs text-red-500">{zodError.name}</p>}
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={processing} className="ml-auto">
                                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                {isEdit ? 'Update Role' : 'Tambah Role Baru'}
                            </Button>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
