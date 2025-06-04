import { DataTableColumnHeader } from '@/components/datatable-column-header';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { Department } from '../data/departmentSchema';
import { DepartmentRowAction } from './department-row-action';
// import { DepartmentRowAction } from './department-row-action';

export const DepartmentsColumn: ColumnDef<Department>[] = [
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
        accessorKey: 'department_code',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Kode Departemen" />,
        cell: ({ row }) => <div className="text-base">{row.getValue('department_code')}</div>,
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
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Departemen" />,
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
        accessorKey: 'office_id',
        header: ({ column }) => <DataTableColumnHeader column={column} title="ID Kantor" />,
        cell: ({ row }) => <div className="text-base">{row.getValue('office_id')}</div>,
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
        cell: DepartmentRowAction,
    },
];
