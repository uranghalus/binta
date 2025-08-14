import { DataTableFacetedFilter } from '@/components/datatable-faceted-filter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table } from '@tanstack/react-table';
import { Printer, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props<TData> {
    table: Table<TData>;
}
export default function CpToolbar<TData>({ table }: Props<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;
    const [lantaiList, setLantaiList] = useState<string[]>([]);
    const [areaList, setAreaList] = useState<string[]>([]);
    const [batchCount, setBatchCount] = useState(1);
    // const [selectedLokasi, setSelectedLokasi] = useState('');
    const [selectedLantai, setSelectedLantai] = useState('');
    const [selectedBatch, setSelectedBatch] = useState('1');
    useEffect(() => {
        fetch(route('cp.filter.options'))
            .then((res) => res.json())
            .then((data) => {
                setBatchCount(data.totalBatch ?? 1);
                setAreaList(data.area);
                // setLokasiList(data.lokasi ?? []); // gunakan kunci "lokasi" sesuai controller
                setLantaiList(data.lantai ?? []); // TAMBAHKAN ini agar lantai masuk
            });
    }, []);
    const handlePrint = () => {
        const params = new URLSearchParams();
        // if (sLokasi) params.append('lokasi', selectedLokasi);cear
        if (selectedLantai) params.append('lantai', selectedLantai); // tambahkan lantai
        params.append('batch', selectedBatch);

        window.open(`${route('cp.print-qrcode')}?${params.toString()}`, '_blank');
    };
    return (
        <div className="-items-center flex justify-between">
            <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
                <Input
                    placeholder="Cari Cekpoint Security"
                    value={(table.getColumn('kode_cekpoint')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('kode_cekpoint')?.setFilterValue(event.target.value)}
                    className="w-full sm:w-[250px] md:w-[300px] lg:w-[400px]"
                />
                <div className="flex gap-x-2">
                    {table.getColumn('area') && (
                        <DataTableFacetedFilter
                            column={table.getColumn('area')}
                            title="Area"
                            options={areaList.map((lt) => ({ label: lt, value: lt }))}
                        />
                    )}
                    {table.getColumn('lantai') && (
                        <DataTableFacetedFilter
                            column={table.getColumn('lantai')}
                            title="Lantai"
                            options={lantaiList.map((lt) => ({ label: lt, value: lt }))}
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
                <Select onValueChange={setSelectedLantai}>
                    <SelectTrigger className="w-fit">
                        <SelectValue placeholder="Pilih Lokasi" />
                    </SelectTrigger>
                    <SelectContent>
                        {lantaiList.map((lok, i) => (
                            <SelectItem key={i} value={lok}>
                                {lok}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select defaultValue="1" onValueChange={setSelectedBatch}>
                    <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Batch ke-" />
                    </SelectTrigger>
                    <SelectContent>
                        {Array.from({ length: batchCount }, (_, i) => (
                            <SelectItem key={i} value={`${i + 1}`}>
                                Batch {i + 1}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button size="sm" className="h-8" variant="secondary" onClick={handlePrint}>
                    <Printer className="mr-1 h-4 w-4" />
                    Cetak QR Code
                </Button>
            </div>
        </div>
    );
}
