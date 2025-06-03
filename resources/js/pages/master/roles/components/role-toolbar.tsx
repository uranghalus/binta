import { Table } from '@tanstack/react-table';
// import { X } from 'lucide-react';
// import { DataTableFacetedFilter } from '../../../../components/datatable-faceted-filter';
// import { DataTableViewOptions } from '../../../../components/datatable-view-options';
// import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

export function RoleToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
    // const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
                <Input
                    placeholder="Filter by office code..."
                    value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {/* <div className="flex gap-x-2">
                    {table.getColumn('status') && (
                        <DataTableFacetedFilter
                            column={table.getColumn('status')}
                            title="Status"
                            options={[
                                { label: 'Active', value: 'active' },
                                { label: 'Inactive', value: 'inactive' },
                                { label: 'Invited', value: 'invited' },
                                { label: 'Suspended', value: 'suspended' },
                            ]}
                        />
                    )}
                    {table.getColumn('role') && (
                        <DataTableFacetedFilter column={table.getColumn('role')} title="Role" options={} />
                    )}
                </div>
                {isFiltered && (
                    <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
                        Reset
                        <X className="ml-2 h-4 w-4" />
                    </Button>
                )} */}
            </div>
            {/* <DataTableViewOptions table={table} /> */}
        </div>
    );
}
