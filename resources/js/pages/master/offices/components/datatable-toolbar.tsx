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
import { Office } from '../data/scheme';

interface DataTableToolbarProps {
    table: Table<Office>;
}

export function DataTableToolbar({ table }: DataTableToolbarProps) {
    const selectedRows = table.getSelectedRowModel().rows;
    const selectedCount = selectedRows.length;
    const selectedIds = selectedRows.map((row) => row.original.id);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleBulkDelete = () => {
        setIsSubmitting(true);

        router.post(
            route('unit-bisnis.bulk-delete'),
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
        <div className="flex items-center justify-between">
            <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
                <Input
                    placeholder="Filter by office code..."
                    value={(table.getColumn('office_code')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('office_code')?.setFilterValue(event.target.value)}
                    className="h-8 w-[150px] lg:w-[250px]"
                />
            </div>
            {HasAnyPermission(['unit bisnis delete']) && (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" disabled={selectedCount === 0 || isSubmitting} size={'sm'} className="space-x-2">
                            <Trash2 className="size-4" />

                            {isSubmitting ? 'Menghapus...' : `Hapus Unit Bisnis (${selectedCount})`}
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
