import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { departmentSchema } from '../data/departmentSchema';

interface Office {
    id: number;
    office_code: string;
    name: string;
}

interface Department {
    id?: number;
    department_code: string;
    name: string;
    office_id: number;
}

interface Props {
    currentRow?: Department;
    offices: Office[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function DepartmentActionDialog({ onOpenChange, open, currentRow, offices }: Props) {
    const isEdit = !!currentRow;
    const { data, setData, post, put, processing, reset } = useForm({
        id: currentRow?.id,
        department_code: currentRow?.department_code || '',
        name: currentRow?.name || '',
        office_id: currentRow?.office_id || '',
    });
    const [zodError, setZodError] = useState<Record<string, string>>({});

    const handleClose = () => {
        reset();
        setZodError({});
        onOpenChange(false);
    };

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const result = departmentSchema.safeParse(data);
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
            put(route('departemen.update', currentRow?.id), {
                onSuccess: () => {
                    handleClose();
                },
                preserveScroll: true,
            });
        } else {
            post(route('departemen.store'), {
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
                    <DialogTitle>{isEdit ? 'Edit Departemen' : 'Tambah Departemen Baru'}</DialogTitle>
                </DialogHeader>
                <div>
                    <form onSubmit={onSubmit} className="space-y-4 p-0.5">
                        <div className="grid gap-2">
                            <Label htmlFor="department_code" className="text-sm font-medium">
                                Kode Departemen
                            </Label>
                            <Input
                                type="text"
                                id="department_code"
                                name="department_code"
                                value={data.department_code}
                                onChange={(e) => setData('department_code', e.target.value)}
                                className={`input ${zodError.department_code ? 'input-error' : ''}`}
                                placeholder="Masukkan kode departemen"
                            />
                            {zodError.department_code && <p className="text-xs text-red-500">{zodError.department_code}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="text-sm font-medium">
                                Nama Departemen
                            </Label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={`input ${zodError.name ? 'input-error' : ''}`}
                                placeholder="Masukkan nama departemen"
                            />
                            {zodError.name && <p className="text-xs text-red-500">{zodError.name}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="office_id" className="text-sm font-medium">
                                Kantor
                            </Label>
                            <Select
                                value={data.office_id ? data.office_id.toString() : ''}
                                onValueChange={(value) => setData('office_id', Number(value))}
                            >
                                <SelectTrigger id="office_id">
                                    <SelectValue placeholder="Pilih kantor" />
                                </SelectTrigger>
                                <SelectContent>
                                    {offices.map((office) => (
                                        <SelectItem key={office.id} value={office.id.toString()}>
                                            {office.name} ({office.office_code})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {zodError.office_id && <p className="text-xs text-red-500">{zodError.office_id}</p>}
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={handleClose}>
                                Batal
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                {isEdit ? 'Update Departemen' : 'Tambah Departemen'}
                            </Button>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
