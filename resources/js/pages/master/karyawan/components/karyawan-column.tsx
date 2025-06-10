import { DataTableColumnHeader } from '@/components/datatable-column-header';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { BadgeAlert, BadgeCheck } from 'lucide-react';
import { Karyawan } from '../data/karyawanSchema';
import KaryawanRowAction from './karyawan-row-action';
// import { KaryawanRowAction } from './karyawan-row-action';

export const KaryawanColumn: ColumnDef<Karyawan>[] = [
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
        accessorKey: 'nik',
        header: ({ column }) => <DataTableColumnHeader column={column} title="NIK" />,
        cell: ({ row }) => <span className="text-base">{row.getValue('nik')}</span>,
    },
    {
        accessorKey: 'nama',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nama" />,
        cell: ({ row }) => <span className="text-base">{row.getValue('nama')}</span>,
    },
    {
        accessorKey: 'gender',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Jenis Kelamin" />,
        cell: ({ row }) => <span className="text-base">{row.getValue('gender') === 'L' ? 'Laki-laki' : 'Perempuan'}</span>,
    },
    {
        accessorKey: 'department.name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="ID Departemen" />,
        cell: ({ row }) => <span className="text-base">{row.original.department.name}</span>,
    },
    {
        accessorKey: 'jabatan',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Jabatan" />,
        cell: ({ row }) => <span className="text-base">{row.getValue('jabatan') || 'Tidak Ada'}</span>,
    },
    {
        accessorKey: 'status_karyawan',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status Karyawan" />,
        cell: ({ row }) => (
            <Badge variant={'success'} className="px-1.5">
                {row.getValue('status_karyawan') === 'aktif' ? (
                    <BadgeCheck className="size-3 text-[#00916E]" />
                ) : (
                    <BadgeAlert className="text-destructive size-3" />
                )}
                {row.getValue('status_karyawan') === 'aktif' ? 'Aktif' : 'Nonaktif'}
            </Badge>
        ),
    },
    {
        id: 'actions',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Aksi" />,
        cell: KaryawanRowAction,
        meta: {
            className: 'sticky right-0 z-10 rounded-tr md:table-cell',
        },
    },
];
