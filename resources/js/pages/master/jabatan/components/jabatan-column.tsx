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
                'sticky left-0 z-10 rounded-tl md:table-cell',
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
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Jabatan" />,
        cell: ({ row }) => <span className="text-base">{row.getValue('nama_jabatan')}</span>,
    },
    {
        id: 'department_id', // pakai id manual agar bisa difilter
        accessorFn: (row) => String(row.department_id), //
        header: ({ column }) => <DataTableColumnHeader column={column} title="Departemen" />,
        cell: ({ row }) => <span className="text-base">{row.original.department?.name || 'Tidak Ada'}</span>,
    },
    {
        accessorKey: 'unit-bisnis',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Kantor" />,
        cell: ({ row }) => <span className="text-base">{row.original.department?.office.name}</span>,
    },
    {
        id: 'actions',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Aksi" />,
        cell: ({ row }) => <RowAction row={row} editRoute={(id) => route('jabatan.edit', id)} resourceName="Jabatan" />,
        meta: {
            className: 'sticky right-0 z-10 rounded-tr md:table-cell',
        },
    },
];
