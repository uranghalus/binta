import { DataTableColumnHeader } from '@/components/datatable-column-header';
import { RowAction } from '@/components/datatable-row-action';
import { Checkbox } from '@/components/ui/checkbox';
import { cn, toTimestamp } from '@/lib/utils';
import { User } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export const UserColumn: ColumnDef<User>[] = [
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
        accessorKey: 'email',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Email" className="w-full" />,
        cell: ({ row }) => <span className="text-base">{row.getValue('email')}</span>,
    },
    {
        accessorKey: 'karyawan.nama',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Karyawan" />,
        cell: ({ row }) => <span className="text-base">{row.original.karyawan?.nama}</span>,
    },
    {
        accessorKey: 'role.name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
        cell: ({ row }) => <span className="text-base">{row.original.karyawan.jabatan?.nama_jabatan}</span>,
    },
    {
        accessorKey: 'created_at',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Dibuat" />,
        cell: ({ row }) => <span className="text-base">{toTimestamp(row.getValue('created_at'))}</span>,
    },
    {
        id: 'actions',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Aksi" className="ml-auto" />,
        cell: ({ row }) => <RowAction row={row} resourceName="Users" />,
        meta: {
            className: cn(
                'sticky right-0 z-10 w-[60px] px-2',
                'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted transition-colors duration-200',
            ),
        },
    },
];
