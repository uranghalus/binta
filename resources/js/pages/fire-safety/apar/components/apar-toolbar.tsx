import { DataTableFacetedFilter } from '@/components/datatable-faceted-filter';
import { Input } from '@/components/ui/input';
import { Table } from '@tanstack/react-table';
// import { Apar } from '../data/aparSchema';

interface Props<TData> {
    table: Table<TData>;
    // apar: Apar[];
}
function AparToolbar<TData>({ table }: Props<TData>) {
    return (
        <div className="-items-center flex justify-between">
            <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
                <Input
                    placeholder="Cari Apar"
                    value={(table.getColumn('kode_apar')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('kode_apar')?.setFilterValue(event.target.value)}
                    className="w-full sm:w-[250px] md:w-[300px] lg:w-[400px]"
                />
                <div className="flex gap-x-2">
                    {table.getColumn('jenis') && (
                        <DataTableFacetedFilter
                            column={table.getColumn('jenis')}
                            title="Jenis Apar"
                            options={[
                                { label: 'CO2', value: 'CO2' },
                                { label: 'Powder', value: 'Powder' },
                                { label: 'Foam', value: 'Foam' },
                                { label: 'Air', value: 'Air' },
                            ]}
                        />
                    )}
                    {table.getColumn('size') && (
                        <DataTableFacetedFilter
                            column={table.getColumn('size')}
                            title="Ukuran Apar"
                            options={[
                                { label: '2 Kg', value: 2 as unknown as string },
                                { label: '4 Kg', value: 4 as unknown as string },
                                { label: '6 Kg', value: 6 as unknown as string },
                                { label: '9 Kg', value: 9 as unknown as string },
                            ]}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default AparToolbar;
