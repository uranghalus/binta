import { Input } from '@/components/ui/input';
import { Table } from '@tanstack/react-table';

interface Props<TData> {
    table: Table<TData>;
}

function CpiToolbar<TData>({ table }: Props<TData>) {
    return (
        <div className="-items-center flex justify-between">
            <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
                <Input
                    type="text"
                    placeholder="Cari Hydrant"
                    value={(table.getColumn('cekPoint.nama')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('cekPoint.nama')?.setFilterValue(event.target.value)}
                    className="w-full rounded border px-2 py-1 sm:w-[250px] md:w-[300px] lg:w-[400px]"
                />
            </div>
        </div>
    );
}

export default CpiToolbar;
