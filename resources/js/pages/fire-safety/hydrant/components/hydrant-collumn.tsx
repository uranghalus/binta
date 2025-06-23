import { DataTableColumnHeader } from '@/components/datatable-column-header';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { Hydrant } from '../data/hydrantSchema';
import HydrantRowAction from './hydrant-row-action';

export const HydrantColumn: ColumnDef<Hydrant>[] = [
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
        accessorKey: 'kode_unik',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Kode Unik" />,
        cell: ({ row }) => <div className="font-bold">{row.getValue('kode_unik')}</div>,
    },
    {
        accessorKey: 'kode_hydrant',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Kode Hydrant" />,
        cell: ({ row }) => <div>{row.getValue('kode_hydrant')}</div>,
    },
    {
        accessorKey: 'tipe',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Tipe" />,
        cell: ({ row }) => <div>{row.getValue('tipe')}</div>,
    },
    {
        accessorKey: 'lokasi',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Lokasi" />,
        cell: ({ row }) => <div>{row.getValue('lokasi')}</div>,
    },
    {
        accessorKey: 'user_id.karyawan',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Penanggung Jawab" />,
        cell: ({ row }) => <div>{row.original.user?.karyawan?.nama ? row.original.user.karyawan.nama : '-'}</div>,
    },
    {
        id: 'actions',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Aksi" />,
        cell: HydrantRowAction,
    },
];
