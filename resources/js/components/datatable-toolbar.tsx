import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';
import { DataTableFacetedFilter } from './datatable-faceted-filter';
import { DataTableViewOptions } from './datatable-view-options';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface FacetedFilterOption {
    label: string;
    value: string;
}

interface FacetedFilterConfig<TData> {
    columnId: keyof TData | string;
    title: string;
    options: FacetedFilterOption[];
}

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    searchColumn?: keyof TData | string; // optional
    searchPlaceholder?: string;
    filters?: FacetedFilterConfig<TData>[];
}

export function DataTableToolbar<TData>({ table, searchColumn, searchPlaceholder = 'Search...', filters = [] }: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;
    const searchColInstance = searchColumn ? table.getColumn(searchColumn) : null;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
                {searchColInstance && (
                    <Input
                        placeholder={searchPlaceholder}
                        value={(searchColInstance.getFilterValue() as string) ?? ''}
                        onChange={(event) => searchColInstance.setFilterValue(event.target.value)}
                        className="h-8 w-[150px] lg:w-[250px]"
                    />
                )}

                <div className="flex gap-x-2">
                    {filters.map((filter) =>
                        table.getColumn(filter.columnId) ? (
                            <DataTableFacetedFilter
                                key={filter.columnId.toString()}
                                column={table.getColumn(filter.columnId)}
                                title={filter.title}
                                options={filter.options}
                            />
                        ) : null,
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
