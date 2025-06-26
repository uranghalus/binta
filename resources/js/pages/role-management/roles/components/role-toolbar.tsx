import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import HasAnyPermission from '@/lib/permission';
import { router } from '@inertiajs/react';
import { Table } from '@tanstack/react-table';
import { Trash2 } from 'lucide-react';
import { startTransition, useState } from 'react';
import { toast } from 'sonner';
import { IRole } from '../data/rolescheme';

interface RoleToolbarProps {
    table: Table<IRole>;
}
export default function RoleToolbar({ table }: RoleToolbarProps) {
    const selectedRows = table.getSelectedRowModel().rows;
    const selectedCount = selectedRows.length;
    const selectedIds = selectedRows.map((row) => row.original.id);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleBulkDelete = () => {
        setIsSubmitting(true);

        router.post(
            route('role.bulk-delete'),
            { ids: selectedIds },
            {
                onSuccess: () => {
                    toast.success('Success', { description: `${selectedCount} Role berhasil dihapus.` });
                    table.resetRowSelection();
                },
                onError: () => {
                    toast.error('Error!', { description: 'Gagal menghapus Role. Coba lagi.' });
                },
                onFinish: () => {
                    setIsSubmitting(false);
                },
            },
        );
    };
    return (
        <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
                <Input
                    placeholder="Cari berdasarkan nama role"
                    value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
                    className="h-8 w-[150px] lg:w-[250px]"
                />
            </div>
            {HasAnyPermission(['roles delete']) && (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" disabled={selectedCount === 0 || isSubmitting} size={'sm'} className="space-x-2">
                            <Trash2 className="size-4" />

                            {isSubmitting ? 'Menghapus...' : `Hapus Role (${selectedCount})`}
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Yakin ingin menghapus?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Tindakan ini tidak dapat dibatalkan. Data yang telah dihapus akan hilang secara permanen.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel disabled={isSubmitting}>Batal</AlertDialogCancel>
                            <AlertDialogAction
                                disabled={isSubmitting}
                                onClick={() => {
                                    startTransition(handleBulkDelete);
                                }}
                            >
                                Ya, Hapus
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </div>
    );
}
