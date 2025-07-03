import { DataTableColumnHeader } from '@/components/datatable-column-header';
import { RowAction } from '@/components/datatable-row-action';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { Jabatan } from '../data/jabatanSchema';

export const JabatanColumn: ColumnDef<Jabatan>[] = [
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
        accessorKey: 'nama_jabatan',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Jabatan" className="w-full" />,
        cell: ({ row }) => <span className="text-base">{row.getValue('nama_jabatan')}</span>,
    },
    {
        accessorKey: 'roles',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Hak Akses" />,
        cell: ({ row }) => <span className="text-base">{row.original.roles.join(', ')}</span>,
    },
    {
        id: 'actions',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Aksi" className="ml-auto" />,
        cell: ({ row }) => <RowAction row={row} editRoute={(id) => route('jabatan.edit', id)} resourceName="Jabatan" />,
        meta: {
            className: cn(
                'sticky right-0 z-10 w-[60px] px-2', // 👈 lebar tetap dan padding kecil
                'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted transition-colors duration-200',
            ),
        },
    },
];
