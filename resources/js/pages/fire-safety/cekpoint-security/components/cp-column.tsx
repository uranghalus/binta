import { DataTableColumnHeader } from '@/components/datatable-column-header';
import { RowAction } from '@/components/datatable-row-action';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { SecurityData } from '../data/SecurityData';

export const CpColumn: ColumnDef<SecurityData>[] = [
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
        accessorKey: 'kode_cekpoint',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Kode Cekpoint" />,
        cell: ({ row }) => <div className="font-bold">{row.getValue('kode_cekpoint')}</div>,
    },
    {
        accessorKey: 'lokasi',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Lokasi" />,
        cell: ({ row }) => <div>{row.getValue('lokasi')}</div>,
    },
    {
        accessorKey: 'lantai',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Lantai" />,
        cell: ({ row }) => <div>{row.getValue('lantai')}</div>,
    },
    {
        accessorKey: 'area',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Area" />,
        cell: ({ row }) => <div>{row.getValue('area')}</div>,
    },
    {
        id: 'actions',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Actions" />,
        cell: ({ row }) => <RowAction row={row} editRoute={(id) => route('cekpoin-security.edit', id)} resourceName="Cekpoint" />,
        meta: {
            className: 'text-right',
        },
    },
];
