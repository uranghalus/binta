import { Input } from '@headlessui/react';
import { Table } from '@tanstack/react-table';

interface Props<TData> {
    table: Table<TData>;
}

export default function DepartmentToolbar<TData>({ table }: Props<TData>) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
                <Input
                    placeholder="Cari berdasarkan nama role"
                    value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
                    className="h-8 w-[150px] lg:w-[250px]"
                />
            </div>
        </div>
    );
}
