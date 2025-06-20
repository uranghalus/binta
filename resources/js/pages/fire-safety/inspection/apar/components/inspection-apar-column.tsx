import { DataTableColumnHeader } from '@/components/datatable-column-header';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn, formatDate } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { TriangleAlert } from 'lucide-react';
import { AparInspection } from '../data/inspectionAparSchema';
import InspectionAparAction from './inspection-apar-action';

export const InspectionAparColumns: ColumnDef<AparInspection>[] = [
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
        cell: ({ row }) => <span className="font-medium">{row.original.user?.karyawan.nama}</span>,
    },
    {
        accessorKey: 'regu',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Regu" />,
        cell: ({ row }) => <span className="font-medium">{row.getValue('regu') || '-'}</span>,
    },
    {
        accessorKey: 'apar.kode_apar',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Kode Apar" />,
        cell: ({ row }) => <span className="font-medium">{row.original.apar?.kode_apar || '-'}</span>,
    },
    {
        accessorKey: 'kondisi',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Kondisi Apar" />,
        cell: ({ row }) => (
            <Badge variant={row.original.kondisi === 'Rusak' ? 'destructive' : row.original.kondisi === 'Baik' ? 'success' : 'neutral'}>
                {row.original.kondisi}
            </Badge>
        ),
    },
    {
        accessorKey: 'apar.lokasi',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Lokasi Apar" />,
        cell: ({ row }) => <span className="font-medium">{row.original.apar?.lokasi || '-'}</span>,
    },
    {
        accessorKey: 'tanggal_kadaluarsa',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Tanggal Kadaluarsa" />,
        cell: ({ row }) => {
            const rawDate = row.getValue('tanggal_kadaluarsa');
            const kadaluarsaDate = new Date(rawDate as string);
            const today = new Date();

            const isExpired = kadaluarsaDate < today;
            return (
                <div className="flex items-center space-x-1">
                    <span className={cn('text-sm font-medium')}>{formatDate(kadaluarsaDate)}</span>
                    {isExpired && (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <TriangleAlert className="text-destructive size-4 animate-bounce" />
                            </TooltipTrigger>
                            <TooltipContent className="w-[150px]">
                                <span className="text-muted">Apar telah kadaluarsa harap lakukan pengisian ulang </span>
                            </TooltipContent>
                        </Tooltip>
                    )}
                </div>
            );
        },
    },
    {
        id: 'action',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Aksi" />,
        cell: InspectionAparAction,
    },
];
