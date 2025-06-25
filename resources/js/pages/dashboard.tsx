import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
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
export default function Dashboard({ dataGrafikInspeksi, totalApar, totalAparExpired, totalHydrant, totalInspeksiApar }: Props) {
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
                    <h2 className="mb-3 text-lg font-semibold">Grafik Inspeksi APAR & Hydrant (6 Bulan Terakhir)</h2>
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
                </div>
            </div>
        </AppLayout>
    );
}
