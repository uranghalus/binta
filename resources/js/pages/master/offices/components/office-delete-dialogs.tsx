import ConfirmDialog from '@/components/confirm-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
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
    const { delete: destroy, processing } = useForm();
    const handleDelete = () => {
        if (value === currentRow.office_code) return;
        // Call the delete function here
        onOpenChange(false);
        // Add your delete logic here, e.g., API call to delete the office
        destroy(route('unit-bisnis.destroy', value), {
            onSuccess: () => {
                onOpenChange(false);
            },
            onError: (error) => {
                console.error(error);
            },
        });
    };

    return (
        <ConfirmDialog
            open={open}
            onOpenChange={onOpenChange}
            handleConfirm={handleDelete}
            disabled={value.trim() !== currentRow.office_code}
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
            confirmText="Delete"
            destructive
        >
            <div className="grid gap-2">
                <Label className="text-sm text-gray-500">Masukkan kode kantor untuk mengkonfirmasi penghapusan:</Label>

                <Alert variant="destructive">
                    <AlertTitle>Perhatian!</AlertTitle>
                    <AlertDescription>Tolong Berhati hati, Aksi ini tidak dapat di kembalikan</AlertDescription>
                </Alert>
                <Separator />
                <div className="flex w-full items-center gap-2 rounded-md border border-red-300 bg-red-50 p-2 text-sm text-red-500">
                    <span className="text-sm">
                        Kode Kantor: <span className="font-bold">{currentRow.office_code}</span>
                    </span>
                    <span className="text-sm text-red-500">{currentRow.name}</span>
                </div>
            </div>
            <div className="space-y-3">
                <Label htmlFor="Office Code">Code Office:</Label>
                <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter username to confirm deletion." />
            </div>
        </ConfirmDialog>
    );
}
