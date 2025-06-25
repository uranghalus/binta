import ConfirmDialog from '@/components/confirm-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useForm } from '@inertiajs/react';
import { TriangleAlert } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { PermissionSchema } from '../data/permissionSchema';

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    currentRow?: PermissionSchema | null;
}

export default function PermissionDeleteAction({ open, onOpenChange, currentRow }: Props) {
    const [value, setValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { delete: destroy, processing } = useForm();

    const handleClose = () => {
        setValue('');
        setErrorMessage('');
        onOpenChange(false);
    };

    const handleDelete = () => {
        if (value !== currentRow?.name) {
            setErrorMessage('Nama permission tidak sesuai');
            return;
        }
        destroy(route('permission.destroy', currentRow?.id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Permission berhasil dihapus', { description: 'Permission berhasil dihapus.' });
                setTimeout(() => {
                    handleClose();
                }, 1000);
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
                    <TriangleAlert className="stroke-destructive mr-1 inline-block" size={18} /> Hapus Permission
                </span>
            }
            desc={
                <span className="text-gray-500">
                    Apakah Anda yakin ingin menghapus permission <span className="font-bold">{currentRow?.name}</span>?
                </span>
            }
            confirmText={processing ? 'Menghapus...' : 'Delete'}
            destructive
        >
            <div className="grid gap-2">
                <Label className="text-sm text-gray-500">
                    Untuk mengkonfirmasi, silakan ketik nama permission <span className="font-bold">{currentRow?.name}</span>:
                </Label>
                <Alert variant={'destructive'}>
                    <AlertTitle>Perhatian!</AlertTitle>
                    <AlertDescription>Tolong berhati-hati, aksi ini tidak dapat dikembalikan.</AlertDescription>
                </Alert>
                <Separator />
                <div className="flex w-full items-center gap-2 rounded-md border border-red-300 bg-red-50 p-2 text-sm text-red-500">
                    <div className="text-sm">
                        Ketik Ini: <span className="font-bold">{currentRow?.name}</span>
                    </div>
                </div>
            </div>
            <div className="mt-4 space-y-2">
                <Label htmlFor="confirmation" className="text-sm font-medium">
                    Ketik nama permission untuk mengkonfirmasi:
                </Label>
                <Input
                    type="text"
                    id="confirmation"
                    value={value}
                    onChange={handleChange}
                    className={`input w-full ${errorMessage ? 'input-error' : ''}`}
                    placeholder={`Ketik "${currentRow?.name}" untuk mengkonfirmasi penghapusan`}
                    disabled={processing}
                />
                {errorMessage && <p className="text-xs text-red-500">{errorMessage}</p>}
            </div>
        </ConfirmDialog>
    );
}
