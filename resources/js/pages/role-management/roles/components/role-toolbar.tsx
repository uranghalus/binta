import { Input } from '@/components/ui/input';
import { Table } from '@tanstack/react-table';

interface RoleToolbarProps<TData> {
    table: Table<TData>;
}
export default function RoleToolbar<TData>({ table }: RoleToolbarProps<TData>) {
    // const isFiltered = table.getState().columnFilters.length > 0;
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
