import { DataTableColumnHeader } from '@/components/datatable-column-header';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { Role } from '../data/scheme';
import RoleAction from './role-action';

export const RoleColumn: ColumnDef<Role>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="size-4 translate-y-[2px]" // ukuran checkbox kecil
            />
        ),
        meta: {
            className: cn(
                'sticky left-0 z-10 w-fit rounded-tl md:table-cell',
                'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted transition-colors duration-200',
            ),
        },
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="size-4 translate-y-[2px]" // ukuran checkbox kecil
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Role" />,
        cell: ({ row }) => <div className="w-fit text-nowrap">{row.getValue('name')}</div>,
        enableHiding: false,
    },
    {
        id: 'actions',
        cell: RoleAction,
    },
];
