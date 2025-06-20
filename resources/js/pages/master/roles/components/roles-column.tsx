import { DataTableColumnHeader } from '@/components/datatable-column-header';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { IRole } from '../data/rolescheme';

export const RolesColumn: ColumnDef<IRole>[] = [
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
        accessorKey: 'permissions',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Permissions" />,
        cell: ({ row }) => {
            const { name, permissions } = row.original;

            if (name === 'superadmin') {
                return <Badge variant="secondary">all-permissions</Badge>;
            }

            if (!Array.isArray(permissions) || permissions.length === 0) {
                return <span className="text-muted-foreground">-</span>;
            }

            return (
                <div className="flex flex-wrap gap-2">
                    {permissions.map((permission) => (
                        <Badge key={permission.id || permission.name} variant="success" className="text-xs font-normal">
                            {permission.name === 'super-admin' ? 'all-permissions' : permission.name}
                        </Badge>
                    ))}
                </div>
            );
        },
    },

    // {
    //     id: 'actions',
    //     header: ({ column }) => <DataTableColumnHeader column={column} title="Aksi" />,
    //     cell: RoleRowAction,
    // },
];
