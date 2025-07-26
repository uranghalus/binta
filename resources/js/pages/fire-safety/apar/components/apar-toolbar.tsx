import { DataTableFacetedFilter } from '@/components/datatable-faceted-filter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from '@inertiajs/react';
import { Table } from '@tanstack/react-table';
import { Printer, X } from 'lucide-react';
import { useState } from 'react';
// import { Apar } from '../data/aparSchema';

interface Props<TData> {
    table: Table<TData>;
    // apar: Apar[];
}
function AparToolbar<TData>({ table }: Props<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;
    // Simulasi jumlah batch, nanti bisa diganti prop atau perhitungan otomatis
    const totalBatch = 4;
    const [selectedBatch, setSelectedBatch] = useState<string>('1');
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
                {isFiltered && (
                    <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
                        Reset
                        <X className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>

            <div className="flex items-center space-x-2">
                {/* Dropdown Pilih Batch */}
                <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                    <SelectTrigger className="h-8 w-[100px]">
                        <SelectValue placeholder="Batch" />
                    </SelectTrigger>
                    <SelectContent>
                        {[...Array(totalBatch)].map((_, index) => (
                            <SelectItem key={index} value={(index + 1).toString()}>
                                Batch {index + 1}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Tombol Cetak PDF QR Code Batch */}
                <Button asChild size={'sm'} className="h-8" variant={'secondary'}>
                    <Link href={route('apar.print-qrcode', { batch: selectedBatch })} className="space-x-1">
                        <span>Cetak QR Code</span>
                        <Printer className="h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    );
}

export default AparToolbar;
