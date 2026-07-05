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
import { Input } from '@/components/ui/input';
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
import { PaginatedData } from '@/types';
import { Head, router } from '@inertiajs/react';
import { CheckIcon, ChevronsUpDownIcon, Printer, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

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
    rekap: PaginatedData<CPInspection>;
    bulan: string;
    tahun: string;
    filters: {
        bulan: string;
        tahun: string;
        search?: string;
    };
}

export default function CPRekap({ rekap, bulan, tahun, filters }: Props) {
    const tahunList = [2024, 2025, 2026];

    const [openTahun, setOpenTahun] = useState(false);
    const [tahunVal, setTahunVal] = useState(tahun);

    const [openBulan, setOpenBulan] = useState(false);
    const [bulanVal, setBulanVal] = useState(bulan);

    const [search, setSearch] = useState(filters.search || '');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search !== (filters.search || '')) {
                router.get(
                    route('cekpoint.rekap'),
                    { bulan, tahun, page: 1, search },
                    { preserveScroll: true, replace: true }
                );
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    const handleFilterChange = (key: string, value: string) => {
        router.get(
            route('cekpoint.rekap'),
            { bulan, tahun, search, page: 1, [key]: value },
            { preserveScroll: true }
        );
    };

    const handlePageChange = (page: number) => {
        router.get(
            route('cekpoint.rekap'),
            { bulan, tahun, search, page },
            { preserveScroll: true }
        );
    };

    const handleExport = () => {
        window.open(route('cekpoint.pdf', { bulan, tahun, search }), '_blank');
    };

    const getPageNumbers = () => {
        const totalPages = rekap.last_page;
        const currentPage = rekap.current_page;
        const pageNumbers: (number | string)[] = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            pageNumbers.push(1);
            if (currentPage > 3) {
                pageNumbers.push('...');
            }

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pageNumbers.push(i);
            }

            if (currentPage < totalPages - 2) {
                pageNumbers.push('...');
            }
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
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
                    <Input
                        placeholder="Cari kode cp, regu, petugas, kondisi..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="h-9 w-[250px] lg:w-[350px]"
                    />
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
                            {rekap.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center">
                                        Tidak ada data
                                    </TableCell>
                                </TableRow>
                            ) : (
                                rekap.data.map((item, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{(rekap.from ?? 1) + index}</TableCell>
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

                    {/* PAGINATION */}
                    {rekap.total > 0 && (
                        <div className="mt-4 flex items-center justify-between px-2">
                            <div className="text-muted-foreground text-sm">
                                Menampilkan {rekap.from ?? 0} sampai {rekap.to ?? 0} dari {rekap.total ?? 0} data
                            </div>
                            <div className="flex items-center space-x-1">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => handlePageChange(rekap.current_page - 1)}
                                    disabled={rekap.current_page <= 1}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>

                                {getPageNumbers().map((page, idx) => {
                                    if (page === '...') {
                                        return (
                                            <span key={idx} className="px-2 text-muted-foreground text-sm">
                                                ...
                                            </span>
                                        );
                                    }
                                    return (
                                        <Button
                                            key={idx}
                                            variant={rekap.current_page === page ? 'default' : 'outline'}
                                            size="icon"
                                            className="h-8 w-8 text-sm"
                                            onClick={() => handlePageChange(page as number)}
                                        >
                                            {page}
                                        </Button>
                                    );
                                })}

                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => handlePageChange(rekap.current_page + 1)}
                                    disabled={rekap.current_page >= rekap.last_page}
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </AppLayout>
    );
}
