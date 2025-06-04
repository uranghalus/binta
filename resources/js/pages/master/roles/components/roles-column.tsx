import { DataTableColumnHeader } from '@/components/datatable-column-header';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { Role } from '../data/rolescheme';
import { RoleRowAction } from './role-row-action';

export const RolesColumn: ColumnDef<Role>[] = [
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
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Role Name" />,
        cell: ({ row }) => <div className="text-base">{row.getValue('name')}</div>,
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
        id: 'actions',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Aksi" />,
        cell: RoleRowAction,
    },
];
