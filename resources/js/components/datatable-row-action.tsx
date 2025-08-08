import { useDialog } from '@/context/dialog-context';
import HasAnyPermission from '@/lib/permission';

import { Link } from '@inertiajs/react';
import { Row } from '@tanstack/react-table';
import { ScanSearch, SquarePen, Trash2 } from 'lucide-react';

interface RowActionProps<T> {
    row: Row<T>;
    editRoute?: (id: number | string) => string; // sekarang opsional
    viewRoute?: (id: number | string) => string; // opsional
    resourceName?: string;
    onDelete?: () => void;
}

export function RowAction<T>({ row, editRoute, viewRoute, resourceName = 'Item', onDelete }: RowActionProps<T>) {
    const { setOpen, setCurrentRow } = useDialog();

    const id = (row.original as any).id;
    const canEdit = !!editRoute && HasAnyPermission([`${resourceName.toLowerCase()} edit`]);
    const canView = !!viewRoute && HasAnyPermission([`${resourceName.toLowerCase()} view`]);
    const canDelete = HasAnyPermission([`${resourceName.toLowerCase()} delete`]);

    return (
        <div className="inline-flex rounded-md shadow-sm" role="group">
            {/* Edit Button */}
            {canEdit && (
                <Link
                    href={editRoute!(id)}
                    className={`flex items-center space-x-2 border border-amber-400 bg-amber-500 p-2.5 text-xs font-medium text-white hover:bg-amber-600 focus:z-10 focus:ring-1 focus:ring-amber-600 dark:border-gray-600 dark:bg-amber-600 dark:text-gray-100 dark:hover:bg-amber-700 dark:focus:ring-amber-700 ${
                        !canView && !canDelete ? 'rounded-md' : 'rounded-l-md'
                    }`}
                    title={`Edit ${resourceName}`}
                >
                    <SquarePen className="size-4" />
                </Link>
            )}

            {/* View Button */}
            {canView && (
                <Link
                    href={viewRoute!(id)}
                    className={`flex items-center space-x-2 border-t border-b border-sky-300 bg-sky-400 p-2.5 text-xs font-medium text-white hover:bg-sky-500 focus:z-10 focus:ring-1 focus:ring-sky-500 dark:border-gray-600 dark:bg-sky-600 dark:text-gray-100 dark:hover:bg-sky-700 dark:focus:ring-sky-700 ${
                        !canEdit && !canDelete ? 'rounded-md' : canEdit ? '' : 'rounded-l-md'
                    }`}
                    title={`View ${resourceName}`}
                >
                    <ScanSearch className="size-4" />
                </Link>
            )}

            {/* Delete Button */}
            {canDelete && (
                <button
                    type="button"
                    className={`flex items-center space-x-2 border border-red-300 p-2.5 text-xs font-medium text-white hover:bg-red-600 ${
                        !canEdit && !canView ? 'rounded-md bg-red-500' : 'rounded-r-md bg-red-500'
                    }`}
                    onClick={() => {
                        if (onDelete) {
                            onDelete();
                        } else {
                            setCurrentRow(row.original);
                            setOpen('delete');
                        }
                    }}
                    title={`Delete ${resourceName}`}
                >
                    <Trash2 className="size-4" />
                </button>
            )}
        </div>
    );
}
