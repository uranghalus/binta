import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    RowData,
    SortingState,
    useReactTable,
    VisibilityState,
} from '@tanstack/react-table';

declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData extends RowData, TValue> {
        className: string;
    }
}

import { DataTablePagination } from '@/components/datatable-pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState, useEffect } from 'react';
import { HydrantInspectionsc } from '../data/HydrantInspectionsc';
import HydrantInspectionToolbar from './hydrant-inspection-toolbar';
import { PaginatedData } from '@/types';
import { router } from '@inertiajs/react';

interface Props {
    columns: ColumnDef<HydrantInspectionsc>[];
    data: PaginatedData<HydrantInspectionsc>;
    filters: {
        search?: string;
    };
}

export default function HydrantInspectionTable({ columns, data: paginatedData, filters }: Props) {
    const data = paginatedData.data;
    const pageCount = paginatedData.last_page;
    const pageIndex = paginatedData.current_page - 1;
    const pageSize = paginatedData.per_page;

    const [rowSelection, setRowSelection] = useState({});
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [searchVal, setSearchVal] = useState(filters.search || '');

    // Debounce search update
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchVal !== (filters.search || '')) {
                router.get(
                    route(route().current() || ''),
                    {
                        search: searchVal || undefined,
                        page: 1, // Reset page to 1
                    },
                    {
                        preserveState: true,
                        preserveScroll: true,
                        replace: true,
                    }
                );
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchVal]);

    const onPaginationChange = (updater: any) => {
        const nextState = typeof updater === 'function' ? updater({ pageIndex, pageSize }) : updater;
        router.get(
            route(route().current() || ''),
            {
                page: nextState.pageIndex + 1,
                per_page: nextState.pageSize,
                search: searchVal || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const table = useReactTable({
        data,
        columns,
        pageCount,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            pagination: {
                pageIndex,
                pageSize,
            }
        },
        manualPagination: true,
        onPaginationChange,
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    });
    return (
        <div className="space-y-4">
            <HydrantInspectionToolbar search={searchVal} onSearchChange={setSearchVal} />
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="group/row">
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} colSpan={header.colSpan} className={header.column.columnDef.meta?.className ?? ''}>
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} className="group/row">
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className={cell.column.columnDef.meta?.className ?? ''}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    );
}

