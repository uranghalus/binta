import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';

import { Head } from '@inertiajs/react';
import { Droplets, FireExtinguisher, ListChecks } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis } from 'recharts';
interface Props {
    dataGrafikInspeksi: { bulan: string; apar: number; hydrant: number }[];
    totalApar: number;
    totalHydrant: number;
    totalAparExpired: number;
    totalInspeksiApar: number;
    aparBermasalah;
}
const chartConfig = {
    apar: {
        label: 'APAR',
        color: '#2563eb',
    },
    hydrant: {
        label: 'Hydrant',
        color: '#60a5fa',
    },
} satisfies ChartConfig;
export default function Dashboard({ dataGrafikInspeksi, totalApar, totalAparExpired, totalHydrant, totalInspeksiApar, aparBermasalah }: Props) {
    console.log(dataGrafikInspeksi);

    return (
        <AppLayout title={'Dashboard'}>
            <Head title="Dashboard" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-sm font-medium">Total Apar</CardTitle>
                        <div className="rounded bg-[#d46600]/20 p-2 text-[#d46600] shadow shadow-[#d46600]">
                            <FireExtinguisher className="h-5 w-5" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalApar} Buah</div>
                        <p className="text-muted-foreground text-xs">Total Jumlah Keseluruhan APAR</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-sm font-medium">Total Hydrant</CardTitle>
                        <div className="rounded bg-[#39726f]/20 p-2 text-[#39726f] shadow shadow-[#39726f]">
                            <Droplets className="h-5 w-5" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalHydrant} Buah</div>
                        <p className="text-muted-foreground text-xs">Total Jumlah Keseluruhan Hydrant</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-sm font-medium">Apar Kadaluarsa</CardTitle>
                        <div className="rounded bg-[#ec486a]/20 p-2 text-[#ec486a] shadow shadow-[#ec486a]">
                            <Droplets className="h-5 w-5" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalAparExpired} Buah</div>
                        <p className="text-muted-foreground text-xs">Total Jumlah Apar Kadaluarsa</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-sm font-medium">Inspeksi Apar</CardTitle>
                        <div className="rounded bg-[#a74c9c]/20 p-2 text-[#a74c9c] shadow shadow-[#a74c9c]">
                            <ListChecks className="h-5 w-5" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalInspeksiApar} Buah</div>
                        <p className="text-muted-foreground text-xs">Total Inspeksi Bulan ini</p>
                    </CardContent>
                </Card>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Grafik Inspeksi APAR & Hydrant (6 Bulan Terakhir)</CardTitle>
                            <CardDescription className="text-sm">test</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={dataGrafikInspeksi}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="bulan" tickLine={false} tickMargin={10} />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Bar dataKey="apar" fill="var(--color-apar)" radius={4} />
                                        <Bar dataKey="hydrant" fill="var(--color-hydrant)" radius={4} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Apar Bermasalah</CardTitle>
                        <CardDescription className="text-xs">Data Apar Bermasalah Terbaru</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Kode APAR</TableHead>
                                    <TableHead>Lokasi</TableHead>
                                    <TableHead>Kondisi</TableHead>
                                    <TableHead>Tanggal</TableHead>
                                    <TableHead>Foto</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {aparBermasalah.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center">
                                            Tidak ada data bermasalah
                                        </TableCell>
                                    </TableRow>
                                )}
                                {aparBermasalah.map((item, i) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell>{item.apar?.kode_apar ?? '-'}</TableCell>
                                        <TableCell>{item.apar?.lokasi ?? '-'}</TableCell>
                                        <TableCell className="font-semibold text-red-600">{item.kondisi ?? '-'}</TableCell>
                                        <TableCell>{new Date(item.tanggal_inspeksi).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            {item.foto_apar ? <img src={item.foto_apar_url} alt="foto" className="h-14 rounded-md" /> : '-'}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
