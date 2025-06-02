import ConfirmDialog from '@/components/confirm-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils'; // pastikan util ini tersedia
import { useForm } from '@inertiajs/react';
import { TriangleAlert } from 'lucide-react';
import { useState } from 'react';
import { Office } from '../data/scheme';

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    currentRow: Office;
}

export default function OfficeDeleteDialog({ open, onOpenChange, currentRow }: Props) {
    const [value, setValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        if (value !== currentRow.office_code) {
            setErrorMessage('Kode kantor tidak cocok.');
            return;
        }

        destroy(route('unit-bisnis.destroy', currentRow.id), {
            onSuccess: () => {
                onOpenChange(false);
                setValue('');
                setErrorMessage('');
            },
            onError: (error) => {
                console.error(error);
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
            disabled={processing || value.trim() !== currentRow.office_code}
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
                <Label className="text-sm text-gray-500">Masukkan kode kantor untuk mengkonfirmasi penghapusan:</Label>

                <Alert variant="destructive">
                    <AlertTitle>Perhatian!</AlertTitle>
                    <AlertDescription>Tolong berhati-hati, aksi ini tidak dapat dikembalikan.</AlertDescription>
                </Alert>
                <Separator />
                <div className="flex w-full items-center gap-2 rounded-md border border-red-300 bg-red-50 p-2 text-sm text-red-500">
                    <span className="text-sm">
                        Kode Kantor: <span className="font-bold">{currentRow.office_code}</span>
                    </span>
                    <span className="text-sm text-red-500">{currentRow.name}</span>
                </div>
            </div>

            <div className="mt-4 space-y-2">
                <Label htmlFor="office-code">Kode Kantor</Label>
                <Input
                    id="office-code"
                    value={value}
                    onChange={handleChange}
                    placeholder="Masukkan kode kantor untuk konfirmasi"
                    className={cn(errorMessage && 'border-red-500')}
                />
                {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
            </div>
        </ConfirmDialog>
    );
}
