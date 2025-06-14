import { DataTableColumnHeader } from '@/components/datatable-column-header';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { Apar } from '../data/aparSchema';

export const AparColumn: ColumnDef<Apar>[] = [
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
        cell: ({ row }) => <div className="text-base">{row.getValue('kode_unik')}</div>,
        meta: {
            className: cn(
                'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] lg:drop-shadow-none dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
                'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted transition-colors duration-200',
                'sticky left-6 md:table-cell',
            ),
        },
        enableHiding: false,
    },
    {
        accessorKey: 'regu',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Regu" />,
        cell: ({ row }) => <div>{row.getValue('regu')}</div>,
    },
    {
        accessorKey: 'kode_apar',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Kode APAR" />,
        cell: ({ row }) => <div>{row.getValue('kode_apar')}</div>,
    },
    {
        accessorKey: 'lokasi',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Lokasi" />,
        cell: ({ row }) => <div>{row.getValue('lokasi')}</div>,
    },
    {
        accessorKey: 'jenis',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Jenis" />,
        cell: ({ row }) => <div>{row.getValue('jenis')}</div>,
    },
    {
        accessorKey: 'size',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Ukuran" />,
        cell: ({ row }) => <div>{row.getValue('size')}</div>,
    },
    {
        accessorKey: 'date_refill',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Tanggal Refill" />,
        cell: ({ row }) => <div>{row.getValue('date_refill')}</div>,
    },
    {
        accessorKey: 'tanggal_expired',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Tanggal Expired" />,
        cell: ({ row }) => <div>{row.getValue('tanggal_expired')}</div>,
    },
    {
        accessorKey: 'kondisi',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Kondisi" />,
        cell: ({ row }) => <div>{row.getValue('kondisi')}</div>,
    },
    {
        accessorKey: 'tanggal_pengecekan',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Tgl Pengecekan" />,
        cell: ({ row }) => <div>{row.getValue('tanggal_pengecekan') || '-'}</div>,
    },
    // Tambahkan kolom aksi jika diperlukan, contoh:
    // {
    //     id: 'actions',
    //     header: ({ column }) => <DataTableColumnHeader column={column} title="Aksi" />,
    //     cell: AparRowAction,
    // },
];
