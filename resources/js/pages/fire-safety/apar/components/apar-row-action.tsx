import { Button } from '@/components/ui/button';
import { useDialog } from '@/context/dialog-context';
import HasAnyPermission from '@/lib/permission';
import { Link } from '@inertiajs/react';
import { Row } from '@tanstack/react-table';
import { Download, SquarePen, Trash2 } from 'lucide-react';
import { Apar } from '../data/aparSchema';

interface Props {
    row: Row<Apar>;
}

export default function AparRowAction({ row }: Props) {
    const { setOpen, setCurrentRow } = useDialog();

    const buttons: React.ReactNode[] = [];

    if (HasAnyPermission(['apar edit'])) {
        buttons.push(
            <Button
                key="edit"
                onClick={() => {
                    setCurrentRow(row.original);
                    setOpen('edit');
                }}
                className="flex items-center space-x-2 rounded-l-md border border-amber-400 bg-amber-500 p-2.5 text-xs font-medium text-white hover:bg-amber-600 focus:z-10 focus:ring-1 focus:ring-amber-600 dark:border-gray-600 dark:bg-amber-600 dark:text-gray-100 dark:hover:bg-amber-700 dark:focus:ring-amber-700"
            >
                <SquarePen className="size-4" />
            </Button>,
        );
    }

    if (HasAnyPermission(['apar view'])) {
        buttons.push(
            <Link
                key="view"
                href={route('apar.qrcode', row.original.id)}
                className="-ml-px flex items-center space-x-2 border border-sky-300 bg-sky-400 p-2.5 text-xs font-medium text-white hover:bg-sky-500 focus:z-10 focus:ring-1 focus:ring-sky-500 dark:border-gray-600 dark:bg-sky-600 dark:text-gray-100 dark:hover:bg-sky-700 dark:focus:ring-sky-700"
                title={`Download QR Code for ${row.original.kode_apar}`}
            >
                <Download className="size-4" />
            </Link>,
        );
    }

    if (HasAnyPermission(['apar delete'])) {
        buttons.push(
            <button
                key="delete"
                type="button"
                className="-ml-px flex items-center space-x-2 rounded-r-md border border-red-300 bg-red-500 p-2.5 text-xs font-medium text-white hover:bg-red-600"
                onClick={() => {
                    setCurrentRow(row.original);
                    setOpen('delete');
                }}
                title={`Delete Apar ${row.original.kode_apar}`}
            >
                <Trash2 className="size-4" />
            </button>,
        );
    }

    return (
        <div className="inline-flex shadow-sm" role="group">
            {buttons}
        </div>
    );
}
