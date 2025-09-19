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

const mingguList = [
    { value: '1', label: 'Minggu 1' },
    { value: '2', label: 'Minggu 2' },
    { value: '3', label: 'Minggu 3' },
    { value: '4', label: 'Minggu 4' },
    { value: '5', label: 'Minggu 5' }, // opsional, kalau bulan panjang
];

interface Props {
    rekap: any[];
    bulan: string;
    tahun: string;
    minggu?: string;
    tipe?: string; // bulanan | mingguan
}

export default function CekpointRekap({ bulan, rekap, tahun, minggu, tipe = 'bulanan' }: Props) {
    const tahunList = [2024, 2025, 2026];
    const [openTahun, setOpenTahun] = useState(false);
    const [tahunVal, setTahunVal] = useState(tahun);
    const [openBulan, setOpenBulan] = useState(false);
    const [bulanVal, setBulanVal] = useState(bulan);

    const [openMinggu, setOpenMinggu] = useState(false);
    const [mingguVal, setMingguVal] = useState(minggu || '');
    const [tipeVal, setTipeVal] = useState(tipe || 'bulanan');

    const handleFilterChange = (key: string, value: string) => {
        const params: any = { bulan: bulanVal, tahun: tahunVal, tipe: tipeVal };

        if (key === 'minggu') {
            setTipeVal('mingguan');
            setMingguVal(value);
            params.tipe = 'mingguan';
            params.minggu = value;
        }

        if (key === 'bulan') {
            setBulanVal(value);
            params.bulan = value;
            if (tipeVal === 'mingguan') params.minggu = mingguVal;
        }

        if (key === 'tahun') {
            setTahunVal(value);
            params.tahun = value;
            if (tipeVal === 'mingguan') params.minggu = mingguVal;
        }

        router.get(route('cekpoint.rekap'), params, { preserveScroll: true });
    };

    const handleExport = () => {
        const params: any = { bulan: bulanVal, tahun: tahunVal, tipe: tipeVal };

        if (tipeVal === 'mingguan') {
            params.minggu = mingguVal;
        }

        window.open(route('cekpoint.pdf', params), '_blank');
    };

    return (
        <AppLayout title="Rekap Laporan Cekpoint Security">
            <Head title="Rekap Laporan Cekpoint Security" />
            <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Rekap Laporan Inspeksi Cekpoint Security</h2>
                    <p className="text-muted-foreground">
                        {tipe === 'mingguan'
                            ? `Periode ${mingguList.find((m) => m.value === mingguVal)?.label || ''} ${bulanList.find((b) => b.value === bulan)?.label} ${tahun}`
                            : `Periode bulan ${bulanList.find((b) => b.value === bulan)?.label} ${tahun}`}
                    </p>
                </div>
            </div>
            <div className="mb-4 flex items-center justify-between">
                <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
                    {/* Tahun */}
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

                    {/* Bulan */}
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

                    {/* Minggu */}
                    <Popover open={openMinggu} onOpenChange={setOpenMinggu}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" role="combobox" aria-expanded={openMinggu} className="w-[160px] justify-between">
                                {mingguList.find((m) => m.value === mingguVal)?.label ?? 'Pilih minggu...'}
                                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[160px] p-0">
                            <Command>
                                <CommandInput placeholder="Cari minggu..." />
                                <CommandList>
                                    <CommandEmpty>Minggu tidak ditemukan</CommandEmpty>
                                    <CommandGroup>
                                        {mingguList.map((m) => (
                                            <CommandItem
                                                key={m.value}
                                                value={m.value}
                                                onSelect={(currentValue) => {
                                                    setMingguVal(currentValue);
                                                    setOpenMinggu(false);
                                                    handleFilterChange('minggu', currentValue);
                                                }}
                                            >
                                                <CheckIcon className={cn('mr-2 h-4 w-4', mingguVal === m.value ? 'opacity-100' : 'opacity-0')} />
                                                {m.label}
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

            {/* Table tetap sama */}
            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No</TableHead>
                                <TableHead>Kode Cekpoint</TableHead>
                                <TableHead>Lokasi</TableHead>
                                <TableHead>Area</TableHead>
                                <TableHead>Petugas</TableHead>
                                <TableHead>Kondisi</TableHead>
                                <TableHead>Bocoran</TableHead>
                                <TableHead>Penerangan Lampu</TableHead>
                                <TableHead>Kerusakan Fasum</TableHead>
                                <TableHead>Potensi Bahaya Api</TableHead>
                                <TableHead>Potensi Bahaya Keorang</TableHead>
                                <TableHead>Orang Mencurigakan</TableHead>
                                <TableHead>Tanggal</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rekap.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={13} className="text-center">
                                        Tidak ada data
                                    </TableCell>
                                </TableRow>
                            ) : (
                                rekap.map((item, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item.cek_point?.kode_cekpoint || '-'}</TableCell>
                                        <TableCell>{item.cek_point?.lokasi || '-'}</TableCell>
                                        <TableCell>{item.cek_point?.area || '-'}</TableCell>
                                        <TableCell>{item.user?.karyawan?.nama || '-'}</TableCell>
                                        <TableCell>{item.kondisi || '-'}</TableCell>
                                        <TableCell>{item.bocoran || '-'}</TableCell>
                                        <TableCell>{item.penerangan_lampu || '-'}</TableCell>
                                        <TableCell>{item.kerusakan_fasum || '-'}</TableCell>
                                        <TableCell>{item.potensi_bahaya_api || '-'}</TableCell>
                                        <TableCell>{item.potensi_bahaya_keorang || '-'}</TableCell>
                                        <TableCell>{item.orang_mencurigakan || '-'}</TableCell>
                                        <TableCell>
                                            {item.tanggal_patroli
                                                ? new Date(item.tanggal_patroli).toLocaleDateString('id-ID', {
                                                    day: '2-digit',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })
                                                : '-'}
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