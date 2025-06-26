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
import { startTransition, useState } from 'react';
import { toast } from 'sonner';
import { PermissionSchema } from '../data/permissionSchema';

interface Props {
    table: Table<PermissionSchema>;
}

export default function PermissionToolbar({ table }: Props) {
    const selectedRows = table.getSelectedRowModel().rows;
    const selectedCount = selectedRows.length;
    const selectedIds = selectedRows.map((row) => row.original.id);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleBulkDelete = () => {
        setIsSubmitting(true);

        router.post(
            route('permissions.bulk-delete'),
            { ids: selectedIds },
            {
                onSuccess: () => {
                    toast.success(`${selectedCount} permission berhasil dihapus.`);
                    table.resetRowSelection();
                },
                onError: () => {
                    toast.error('Gagal menghapus permission. Coba lagi.');
                },
                onFinish: () => {
                    setIsSubmitting(false);
                },
            },
        );
    };

    return (
        <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center sm:gap-4">
            <Input
                placeholder="Cari Hak Akses"
                value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
                className="w-full sm:w-[250px] md:w-[300px] lg:w-[400px]"
            />
            {HasAnyPermission(['permissions edit']) && (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" disabled={selectedCount === 0 || isSubmitting}>
                            {isSubmitting ? 'Menghapus...' : `Hapus Terpilih (${selectedCount})`}
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
