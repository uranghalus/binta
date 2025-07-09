import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { Head, router } from '@inertiajs/react';
import { CheckIcon, ChevronsUpDownIcon, Printer } from 'lucide-react';
import { useState } from 'react';
const bulanList = [
    { value: '01', label: 'Januari' },
    { value: '02', label: 'Februari' },
    { value: '03', label: 'Maret' },
    { value: '04', label: 'April' },
    { value: '05', label: 'Mei' },
    { value: '06', label: 'Juni' },
    { value: '07', label: 'Juli' },
    { value: '08', label: 'Agustus' },
    { value: '09', label: 'September' },
    { value: '10', label: 'Oktober' },
    { value: '11', label: 'November' },
    { value: '12', label: 'Desember' },
];
interface Props {
    rekap;
    bulan: string;
    tahun: string;
}
export default function HydrantRekap({ bulan, rekap, tahun }: Props) {
    const tahunList = [2024, 2025, 2026];
    const [openTahun, setOpenTahun] = useState(false);
    const [tahunVal, setTahunVal] = useState(tahun);
    const [openBulan, setOpenBulan] = useState(false);
    const [bulanVal, setBulanVal] = useState(bulan);
    const handleFilterChange = (key: string, value: string) => {
        router.get(route('hydrant.rekap'), { bulan, tahun, [key]: value }, { preserveScroll: true });
    };

    const handleExport = () => {
        window.open(route('hydrant.pdf', { bulan, tahun }), '_blank');
    };
    return (
        <AppLayout title="Rekap Laporan Hydrant">
            <Head title="Rekap Laporan Hydrant" />
            <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Rekap Laporan Inspeksi Hydrant</h2>
                    <p className="text-muted-foreground">
                        Periode bulan {bulanList.find((b) => b.value === bulan)?.label} {tahun}
                    </p>
                </div>
            </div>
            <div className="mb-4 flex items-center justify-between">
                <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
                    <Popover open={openTahun} onOpenChange={setOpenTahun}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" role="combobox" aria-expanded={openTahun} className="w-[120px] justify-between">
                                {tahunVal ?? 'Pilih tahun...'}
                                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[120px] p-0">
                            <Command>
                                <CommandInput placeholder="Cari tahun..." />
                                <CommandList>
                                    <CommandEmpty>Tidak ditemukan</CommandEmpty>
                                    <CommandGroup>
                                        {tahunList.map((t) => (
                                            <CommandItem
                                                key={t}
                                                value={String(t)}
                                                onSelect={(currentValue) => {
                                                    setTahunVal(currentValue);
                                                    setOpenTahun(false);
                                                    handleFilterChange('tahun', currentValue);
                                                }}
                                            >
                                                <CheckIcon className={cn('mr-2 h-4 w-4', tahunVal === String(t) ? 'opacity-100' : 'opacity-0')} />
                                                {t}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <Popover open={openBulan} onOpenChange={setOpenBulan}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" role="combobox" aria-expanded={openBulan} className="w-[160px] justify-between">
                                {bulanList.find((b) => b.value === bulanVal)?.label ?? 'Pilih bulan...'}
                                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[160px] p-0">
                            <Command>
                                <CommandInput placeholder="Cari bulan..." />
                                <CommandList>
                                    <CommandEmpty>Bulan tidak ditemukan</CommandEmpty>
                                    <CommandGroup>
                                        {bulanList.map((b) => (
                                            <CommandItem
                                                key={b.value}
                                                value={b.value}
                                                onSelect={(currentValue) => {
                                                    setBulanVal(currentValue);
                                                    setOpenBulan(false);
                                                    handleFilterChange('bulan', currentValue);
                                                }}
                                            >
                                                <CheckIcon className={cn('mr-2 h-4 w-4', bulanVal === b.value ? 'opacity-100' : 'opacity-0')} />
                                                {b.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                <Button onClick={handleExport}>
                    <span>Cetak Laporan</span>
                    <Printer className="h-4 w-4" />
                </Button>
            </div>
            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No</TableHead>
                                <TableHead>Kode Hydrant</TableHead>
                                <TableHead>Lokasi</TableHead>
                                <TableHead>Petugas</TableHead>
                                <TableHead>Selang</TableHead>
                                <TableHead>Noozle</TableHead>
                                <TableHead>Kaca Box</TableHead>
                                <TableHead>Tanggal</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rekap.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center">
                                        Tidak ada data
                                    </TableCell>
                                </TableRow>
                            ) : (
                                rekap.map((item, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item.hydrant?.kode_hydrant || '-'}</TableCell>
                                        <TableCell>{item.hydrant?.lokasi || '-'}</TableCell>
                                        <TableCell>{item.user.karyawan.nama || '-'}</TableCell>
                                        <TableCell>{item.selang_hydrant || '-'}</TableCell>
                                        <TableCell>{item.noozle_hydrant || '-'}</TableCell>
                                        <TableCell>{item.kaca_box_hydrant || '-'}</TableCell>
                                        <TableCell>
                                            {new Date(item.tanggal_inspeksi).toLocaleDateString('id-ID', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
