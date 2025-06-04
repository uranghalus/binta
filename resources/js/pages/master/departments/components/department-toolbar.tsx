import { Input } from '@/components/ui/input';
import { Table } from '@tanstack/react-table';

interface DepartmentToolbarProps<TData> {
    table: Table<TData>;
}

export default function DepartmentToolbar<TData>({ table }: DepartmentToolbarProps<TData>) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
                <Input
                    placeholder="Filter berdasarkan kode departemen..."
                    value={(table.getColumn('department_code')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('department_code')?.setFilterValue(event.target.value)}
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                <Input
                    placeholder="Filter berdasarkan nama departemen..."
                    value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                <Input
                    placeholder="Filter berdasarkan ID kantor..."
                    value={(table.getColumn('office_id')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('office_id')?.setFilterValue(event.target.value)}
                    className="h-8 w-[150px] lg:w-[250px]"
                />
            </div>
        </div>
    );
}
