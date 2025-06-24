import { DataTableFacetedFilter } from '@/components/datatable-faceted-filter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from '@inertiajs/react';
import { Table } from '@tanstack/react-table';
import { Printer, X } from 'lucide-react';

interface Props<TData> {
    table: Table<TData>;
}
export default function HydrantToolbar<TData>({ table }: Props<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;
    return (
        <div className="-items-center flex justify-between">
            <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
                <Input
                    placeholder="Cari Kode Hydrant"
                    value={(table.getColumn('kode_hydrant')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('kode_hydrant')?.setFilterValue(event.target.value)}
                    className="w-full sm:w-[250px] md:w-[300px] lg:w-[400px]"
                />
                <div className="flex gap-x-2">
                    {table.getColumn('tipe') && (
                        <DataTableFacetedFilter
                            column={table.getColumn('tipe')}
                            title="Tipe Hydrant"
                            options={[
                                { label: 'Indoor', value: 'Indoor' },
                                { label: 'Outdoor', value: 'Outdoor' },
                            ]}
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
            <div className="flex items-center space-x-2">
                <Button asChild size={'sm'} className="h-8" variant={'secondary'}>
                    <Link href={route('hydrant.print-qrcode')} className="space-x-1">
                        <span>Cetak QR Code</span>
                        <Printer className="h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
