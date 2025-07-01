import { DataTableColumnHeader } from '@/components/datatable-column-header';
import { RowAction } from '@/components/datatable-row-action';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { Office } from '../data/scheme';

export const officeColumn: ColumnDef<Office>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        meta: {
            className: cn(
                'sticky left-0 z-10 w-10 rounded-tl px-2 md:table-cell',
                'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted transition-colors duration-200',
            ),
        },
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'office_code',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Office Code" className="w-fit" />,
        cell: ({ row }) => <div className="text-base">{row.getValue('office_code')}</div>,
        meta: {
            className: cn(
                'w-fit drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] lg:drop-shadow-none dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
                'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted transition-colors duration-200',
                'sticky left-6 md:table-cell',
            ),
        },
        enableHiding: false,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nama unit Bisnis" />,
        cell: ({ row }) => <div className="w-fit text-nowrap">{row.getValue('name')}</div>,

        enableHiding: false,
    },
    {
        accessorKey: 'address',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Alamat" />,
        cell: ({ row }) => <div className="w-fit text-nowrap">{row.getValue('address')}</div>,

        enableHiding: false,
    },
    {
        id: 'actions',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Aksi" />,
        cell: ({ row }) => <RowAction row={row} editRoute={(id) => route('unit-bisnis.edit', id)} resourceName="Unit Bisnis" />,
        meta: {
            className: cn(
                'sticky right-0 z-10 w-[60px] px-2', // 👈 lebar tetap dan padding kecil
                'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted transition-colors duration-200',
            ),
        },
    },
];
