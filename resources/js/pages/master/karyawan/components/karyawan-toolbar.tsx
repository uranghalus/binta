import { DataTableFacetedFilter } from '@/components/datatable-faceted-filter';
import { DataTableViewOptions } from '@/components/datatable-view-options';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';
import { Department } from '../../departments/data/departmentSchema';

interface Props<TData> {
    table: Table<TData>;
    departments: Department[];
}
export default function KaryawanToolbar<TData>({ table, departments }: Props<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;
    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
                <Input
                    placeholder="Filter Karyawan..."
                    value={(table.getColumn('nama')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('nama')?.setFilterValue(event.target.value)}
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                <div className="flex gap-x-2">
                    {table.getColumn('status_karyawan') && (
                        <DataTableFacetedFilter
                            column={table.getColumn('status_karyawan')}
                            title="Status"
                            options={[
                                { label: 'Aktif', value: 'aktif' },
                                { label: 'Tidak Aktif', value: 'tidak aktif' },
                            ]}
                        />
                    )}
                    {table.getColumn('department_name') && (
                        <DataTableFacetedFilter
                            column={table.getColumn('department_name')}
                            title="Department"
                            options={departments.map((dept) => ({
                                label: dept.name,
                                value: dept.name,
                            }))}
                        />
                    )}
                </div>
                {isFiltered && (
                    <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
                        Reset
                        <X className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <DataTableViewOptions table={table} />
        </div>
    );
}
