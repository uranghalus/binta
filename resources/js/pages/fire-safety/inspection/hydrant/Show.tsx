import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { MapPin, SquarePen } from 'lucide-react';
import { HydrantInspectionsc } from './data/HydrantInspectionsc';

interface Props {
    inspection: HydrantInspectionsc;
}

export default function ShowHydrantInspection({ inspection }: Props) {
    if (!inspection || !inspection.id) {
        return <div>Data tidak tersedia</div>;
    }

    return (
        <AppLayout title="Lihat Detail Inspeksi Hydrant">
            <Head title="Lihat Detail Inspeksi Hydrant" />
            <Card>
                <CardHeader>
                    <CardTitle>Detail Inspeksi Hydrant</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-4 rounded border border-gray-200 p-4">
                        <div className="space-y-2">
                            <h2 className="font-bold text-gray-800">Data Hydrant</h2>
                            <Separator />
                            <div className="grid gap-1">
                                <Label className="text-sm font-bold">Kode Hydrant</Label>
                                <div className="text-muted-foreground">{inspection.hydrant?.kode_hydrant}</div>
                            </div>
                            <div className="grid gap-1">
                                <Label className="text-sm font-bold">Lokasi</Label>
                                <div className="text-muted-foreground flex items-center gap-1">
                                    <MapPin className="size-4" />
                                    {inspection.hydrant?.lokasi}
                                </div>
                            </div>
                            <div className="grid gap-1">
                                <Label className="text-sm font-bold">Ukuran</Label>
                                <div className="text-muted-foreground">{inspection.hydrant?.ukuran}</div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h2 className="font-bold text-gray-800">Kondisi</h2>
                            <Separator />
                            {[
                                ['Valve Machino Coupling', inspection.valve_machino_coupling],
                                ['Fire Hose Machino Coupling', inspection.fire_hose_machino_coupling],
                                ['Selang Hydrant', inspection.selang_hydrant],
                                ['Noozle Hydrant', inspection.noozle_hydrant],
                                ['Kaca Box Hydrant', inspection.kaca_box_hydrant],
                                ['Kunci Box Hydrant', inspection.kunci_box_hydrant],
                                ['Box Hydrant', inspection.box_hydrant],
                                ['Alarm', inspection.alarm],
                            ].map(([label, value]) => (
                                <div className="grid gap-1" key={label}>
                                    <Label className="text-sm font-bold">{label}</Label>
                                    <div className="text-muted-foreground">{value || '-'}</div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <h2 className="font-bold text-gray-800">Petugas</h2>
                            <Separator />
                            <div className="grid gap-1">
                                <Label className="text-sm font-bold">Nama Petugas</Label>
                                <div className="text-muted-foreground">{inspection.user?.karyawan.nama} - {inspection.nama_petugas}</div>
                            </div>
                            <div className="grid gap-1">
                                <Label className="text-sm font-bold">Shift</Label>
                                <div className="text-muted-foreground">{inspection.regu}</div>
                            </div>
                            <div className="grid gap-1">
                                <Label className="text-sm font-bold">Tanggal Inspeksi</Label>
                                <div className="text-muted-foreground">{inspection.tanggal_inspeksi}</div>
                            </div>
                        </div>
                    </div>

                    {inspection.foto_hydrant_url ? (
                        <div className="flex items-center justify-center rounded border border-gray-200 p-4">
                            <img src={inspection.foto_hydrant_url} alt="Foto Hydrant" className="max-w-2xl" />
                        </div>
                    ) : (
                        <div className="bg-muted flex h-full w-full items-center justify-center overflow-hidden rounded">
                            <span className="text-muted-foreground text-sm">Tidak ada foto</span>
                        </div>
                    )}
                </CardContent>

                <CardFooter className="flex items-center justify-between">
                    <Button variant="outline" asChild>
                        <Link href={route('inspection.hydrant.index')}>Kembali</Link>
                    </Button>
                    <div className="flex space-x-2">
                        <Button variant="outline" asChild>
                            <Link href={route('inspection.hydrant.edit', { id: inspection.id })} className="flex items-center space-x-1">
                                Edit Data <SquarePen size={16} />
                            </Link>
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </AppLayout>
    );
}
