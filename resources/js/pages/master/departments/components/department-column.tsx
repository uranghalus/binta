import { DataTableColumnHeader } from '@/components/datatable-column-header';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { Department } from '../data/departmentSchema';
import { DepartmentRowAction } from './department-row-action';

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
        header: ({ column }) => <DataTableColumnHeader column={column} title="Kode Dept" />,
        cell: ({ row }) => <span className="text-base">{row.getValue('department_code')}</span>,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Departemen" />,
        cell: ({ row }) => <span className="text-base">{row.getValue('name')}</span>,
    },
    {
        accessorKey: 'office.name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Kantor" />,
        cell: ({ row }) => <span className="text-base">{row.original.office?.name || 'Tidak Ada'}</span>,
    },
    {
        accessorKey: 'office.office_code',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Kode Kantor" />,
        cell: ({ row }) => <span className="text-base">{row.original.office?.office_code || 'Tidak Ada'}</span>,
    },
    {
        id: 'actions',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Aksi" />,
        cell: DepartmentRowAction,
        meta: {
            className: 'sticky right-0 z-10 rounded-tr md:table-cell',
        },
    },
];
