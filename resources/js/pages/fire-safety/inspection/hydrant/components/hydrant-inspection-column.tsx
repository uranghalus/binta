import { DataTableColumnHeader } from '@/components/datatable-column-header';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { HydrantInspectionsc } from '../data/HydrantInspectionsc';
import HydrantInspectionRowAction from './hydrant-inspection-row-action';

export const HydrantInspectionColumn: ColumnDef<HydrantInspectionsc>[] = [
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
        accessorKey: 'user.karyawan.nama',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Petugas" />,
        cell: ({ row }) => <span className="font-normal">{row.original.user?.karyawan.nama}</span>,
    },
    {
        accessorKey: 'regu',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Shift" />,
        cell: ({ row }) => <span className="font-medium">{row.getValue('regu') || '-'}</span>,
    },
    {
        accessorKey: 'hydrant.kode_hydrant',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Kode Hydrant" />,
        cell: ({ row }) => <span className="font-medium">{row.original.hydrant?.kode_hydrant}</span>,
    },
    {
        accessorKey: 'hydrant.lokasi',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Lokasi Hydrant" />,
        cell: ({ row }) => <span className="font-medium">{row.original.hydrant?.lokasi}</span>,
    },
    {
        accessorKey: 'selang_hydrant',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Selang Hydrant" />,
        cell: ({ row }) => (
            <Badge
                variant={row.original.selang_hydrant === 'Tidak Ada' ? 'destructive' : row.original.selang_hydrant === 'Baik' ? 'success' : 'neutral'}
            >
                {row.original.selang_hydrant}
            </Badge>
        ),
    },
    {
        accessorKey: 'noozle_hydrant',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Noozle Hydrant" />,
        cell: ({ row }) => (
            <Badge
                variant={row.original.noozle_hydrant === 'Tidak Ada' ? 'destructive' : row.original.noozle_hydrant === 'Baik' ? 'success' : 'neutral'}
            >
                {row.original.noozle_hydrant}
            </Badge>
        ),
    },
    {
        accessorKey: 'kaca_box_hydrant',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Kaca Box Hydrant" />,
        cell: ({ row }) => (
            <Badge
                variant={row.original.kaca_box_hydrant === 'Rusak' ? 'destructive' : row.original.kaca_box_hydrant === 'Baik' ? 'success' : 'neutral'}
            >
                {row.original.kaca_box_hydrant}
            </Badge>
        ),
    },
    {
        id: 'action',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Aksi" />,
        cell: HydrantInspectionRowAction,
    },
];
