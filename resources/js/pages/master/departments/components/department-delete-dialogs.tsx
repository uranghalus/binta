import ConfirmDialog from '@/components/confirm-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useForm } from '@inertiajs/react';
import { TriangleAlert } from 'lucide-react';
import React, { useState } from 'react';
import { Department } from '../data/departmentSchema';

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    currentRow: Department;
}

export default function DepartmentDeleteDialog({ open, onOpenChange, currentRow }: Props) {
    const [value, setValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { delete: destroy, processing } = useForm();

    const handleClose = () => {
        setValue('');
        setErrorMessage('');
        onOpenChange(false);
    };

    const handleDelete = () => {
        if (value !== currentRow.name) {
            setErrorMessage('Nama departemen tidak sesuai');
            return;
        }
        destroy(route('departemen.destroy', currentRow.id), {
            preserveScroll: true,
            onSuccess: () => {
                handleClose();
            },
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        if (errorMessage) setErrorMessage('');
    };

    return (
        <ConfirmDialog
            open={open}
            onOpenChange={onOpenChange}
            handleConfirm={handleDelete}
            title={
                <span className="text-destructive">
                    <TriangleAlert className="stroke-destructive mr-1 inline-block" size={18} /> Hapus Data
                </span>
            }
            desc={
                <span className="text-gray-500">
                    Apakah Anda yakin ingin menghapus <span className="font-bold">{currentRow.name}</span>?
                </span>
            }
            confirmText={processing ? 'Menghapus...' : 'Delete'}
            destructive
        >
            <div className="grid gap-2">
                <Label className="text-sm text-gray-500">
                    Untuk mengkonfirmasi, silakan ketik nama departemen <span className="font-bold">{currentRow.name}</span>:
                </Label>
                <Alert variant={'destructive'}>
                    <AlertTitle>Perhatian!</AlertTitle>
                    <AlertDescription>Tolong berhati-hati, aksi ini tidak dapat dikembalikan.</AlertDescription>
                </Alert>
                <Separator />
                <div className="flex w-full items-center gap-2 rounded-md border border-red-300 bg-red-50 p-2 text-sm text-red-500">
                    <div className="text-sm">
                        Ketik Ini: <span className="font-bold">{currentRow.name}</span>
                    </div>
                </div>
            </div>
            <div className="mt-4 space-y-2">
                <Label htmlFor="confirmation" className="text-sm font-medium">
                    Ketik nama departemen untuk mengkonfirmasi:
                </Label>
                <Input
                    type="text"
                    id="confirmation"
                    value={value}
                    onChange={handleChange}
                    className={`input w-full ${errorMessage ? 'input-error' : ''}`}
                    placeholder={`Ketik "${currentRow.name}"`}
                />
                {errorMessage && <p className="text-xs text-red-500">{errorMessage}</p>}
            </div>
        </ConfirmDialog>
    );
}
