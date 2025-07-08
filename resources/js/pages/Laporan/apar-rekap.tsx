import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Printer } from 'lucide-react';

export default function AparRekap({ rekap, bulan, tahun }) {
    const handleExport = () => {
        window.open(route('apar.pdf', { bulan, tahun }), '_blank');
    };
    return (
        <AppLayout title="Rekap Laporan Apar">
            <Head title="Rekap Laporan Apar" />
            <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Rekap Laporan Apar</h2>
                    <p className="text-muted-foreground">
                        Periode bulan {bulan}/{tahun}
                    </p>
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
                                <TableHead className="w-[5%]">No</TableHead>
                                <TableHead>APAR</TableHead>
                                <TableHead>Lokasi</TableHead>
                                <TableHead>Petugas</TableHead>
                                <TableHead>Kondisi</TableHead>
                                <TableHead>Tanggal</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rekap.map((r, i) => (
                                <TableRow key={r.id}>
                                    <TableCell>{i + 1}</TableCell>
                                    <TableCell>{r.apar?.kode_apar}</TableCell>
                                    <TableCell>{r.apar?.lokasi}</TableCell>
                                    <TableCell>{r.user?.karyawan.nama ?? '-'}</TableCell>
                                    <TableCell>{r.kondisi}</TableCell>
                                    <TableCell>{new Date(r.tanggal_inspeksi).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
