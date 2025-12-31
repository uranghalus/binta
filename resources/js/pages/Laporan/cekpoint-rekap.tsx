import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
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

interface CPInspection {
    id: number;
    kode_cp: string;
    nama_petugas: string;
    regu: string;
    kondisi: string;
    tanggal_patroli: string;
}

interface Props {
    rekap: CPInspection[];
    bulan: string;
    tahun: string;
}

export default function CPRekap({ rekap, bulan, tahun }: Props) {
    const tahunList = [2024, 2025, 2026];

    const [openTahun, setOpenTahun] = useState(false);
    const [tahunVal, setTahunVal] = useState(tahun);

    const [openBulan, setOpenBulan] = useState(false);
    const [bulanVal, setBulanVal] = useState(bulan);

    const handleFilterChange = (key: string, value: string) => {
        router.get(
            route('cekpoint.rekap'),
            { bulan, tahun, [key]: value },
            { preserveScroll: true }
        );
    };

    const handleExport = () => {
        window.open(route('cekpoint.pdf', { bulan, tahun }), '_blank');
    };

    return (
        <AppLayout title="Rekap Laporan CP">
            <Head title="Rekap Laporan CP" />

            <div className="mb-2 flex flex-wrap items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Rekap Laporan CP Inspection
                    </h2>
                    <p className="text-muted-foreground">
                        Periode bulan {bulanList.find(b => b.value === bulan)?.label} {tahun}
                    </p>
                </div>
            </div>

            {/* FILTER */}
            <div className="mb-4 flex items-center justify-between">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:space-x-2">
                    {/* Tahun */}
                    <Popover open={openTahun} onOpenChange={setOpenTahun}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                className="w-[120px] justify-between"
                            >
                                {tahunVal}
                                <ChevronsUpDownIcon className="ml-2 h-4 w-4 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[120px] p-0">
                            <Command>
                                <CommandInput placeholder="Cari tahun..." />
                                <CommandList>
                                    <CommandEmpty>Tidak ditemukan</CommandEmpty>
                                    <CommandGroup>
                                        {tahunList.map(t => (
                                            <CommandItem
                                                key={t}
                                                value={String(t)}
                                                onSelect={val => {
                                                    setTahunVal(val);
                                                    setOpenTahun(false);
                                                    handleFilterChange('tahun', val);
                                                }}
                                            >
                                                <CheckIcon
                                                    className={cn(
                                                        'mr-2 h-4 w-4',
                                                        tahunVal === String(t)
                                                            ? 'opacity-100'
                                                            : 'opacity-0'
                                                    )}
                                                />
                                                {t}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>

                    {/* Bulan */}
                    <Popover open={openBulan} onOpenChange={setOpenBulan}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                className="w-[160px] justify-between"
                            >
                                {bulanList.find(b => b.value === bulanVal)?.label}
                                <ChevronsUpDownIcon className="ml-2 h-4 w-4 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[160px] p-0">
                            <Command>
                                <CommandInput placeholder="Cari bulan..." />
                                <CommandList>
                                    <CommandEmpty>Bulan tidak ditemukan</CommandEmpty>
                                    <CommandGroup>
                                        {bulanList.map(b => (
                                            <CommandItem
                                                key={b.value}
                                                value={b.value}
                                                onSelect={val => {
                                                    setBulanVal(val);
                                                    setOpenBulan(false);
                                                    handleFilterChange('bulan', val);
                                                }}
                                            >
                                                <CheckIcon
                                                    className={cn(
                                                        'mr-2 h-4 w-4',
                                                        bulanVal === b.value
                                                            ? 'opacity-100'
                                                            : 'opacity-0'
                                                    )}
                                                />
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
                    <Printer className="ml-2 h-4 w-4" />
                </Button>
            </div>

            {/* TABLE */}
            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No</TableHead>
                                <TableHead>Kode CP</TableHead>
                                <TableHead>Petugas</TableHead>
                                <TableHead>Regu</TableHead>
                                <TableHead>Kondisi</TableHead>
                                <TableHead>Tanggal</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rekap.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center">
                                        Tidak ada data
                                    </TableCell>
                                </TableRow>
                            ) : (
                                rekap.map((item, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item.kode_cp}</TableCell>
                                        <TableCell>{item.nama_petugas}</TableCell>
                                        <TableCell>{item.regu}</TableCell>
                                        <TableCell className="max-w-xs truncate">
                                            {item.kondisi}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(item.tanggal_patroli).toLocaleDateString(
                                                'id-ID',
                                                {
                                                    day: '2-digit',
                                                    month: 'long',
                                                    year: 'numeric',
                                                }
                                            )}
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
