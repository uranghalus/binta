import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { MapPin, SquarePen } from 'lucide-react';
import { AparInspection } from './data/inspectionAparSchema';

interface Props {
    aparData: AparInspection;
}
export default function Show({ aparData }: Props) {
    if (!aparData || !aparData.id) {
        return <div>Data tidak tersedia</div>; // Atau tampilkan spinner/loading
    }

    return (
        <AppLayout title="Lihat Detail Data">
            <Head title="Lihat Detail Data" />
            <Card>
                <CardHeader>
                    <CardTitle>Data Apar Inspeksi APAR</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-4 rounded border border-gray-200 p-4">
                        <div className="space-y-2">
                            <h2 className="font-bold text-gray-800">Data Apar</h2>
                            <Separator />
                            <div className="grid gap-1">
                                <Label className="text-sm font-bold">Kode Apar</Label>
                                <div className="text-muted-foreground">{aparData.apar?.kode_apar}</div>
                            </div>
                            <div className="grid gap-1">
                                <Label className="text-sm font-bold">Lokasi Apar</Label>
                                <div className="text-muted-foreground flex items-center gap-1">
                                    <MapPin className="size-4" />
                                    {aparData.apar?.lokasi}
                                </div>
                            </div>
                            <div className="grid gap-1">
                                <Label className="text-sm font-bold">Jenis Apar</Label>
                                <div className="text-muted-foreground">{aparData.apar?.jenis}</div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h2 className="font-bold text-gray-800">Kondisi Apar</h2>
                            <Separator />
                            <div className="grid gap-1">
                                <Label className="text-sm font-bold">Tanggal Kadaluarsa</Label>
                                <div className="text-muted-foreground">{aparData.tanggal_kadaluarsa}</div>
                            </div>
                            <div className="grid gap-1">
                                <Label className="text-sm font-bold">Tanggal Refill</Label>
                                <div className="text-muted-foreground">{aparData.tanggal_refill}</div>
                            </div>
                            <div className="grid gap-1">
                                <Label className="text-sm font-bold">Kondisi</Label>
                                <div className="text-muted-foreground">
                                    {
                                        <Badge
                                            variant={
                                                aparData.kondisi === 'Rusak' ? 'destructive' : aparData.kondisi === 'Baik' ? 'success' : 'neutral'
                                            }
                                        >
                                            {aparData.kondisi}
                                        </Badge>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h2 className="font-bold text-gray-800">Data Pemeriksa</h2>
                            <Separator />
                            <div className="grid gap-1">
                                <Label className="text-sm font-bold">Nama Petugas</Label>
                                <div className="text-muted-foreground">{aparData.user?.karyawan.nama}</div>
                            </div>
                            <div className="grid gap-1">
                                <Label className="text-sm font-bold">Regu</Label>
                                <div className="text-muted-foreground">{aparData.regu}</div>
                            </div>
                            <div className="grid gap-1">
                                <Label className="text-sm font-bold">Tanggal Pemeriksaan</Label>
                                <div className="text-muted-foreground">{aparData.tanggal_inspeksi}</div>
                            </div>
                        </div>
                    </div>
                    {aparData.foto_apar ? (
                        <div className="flex items-center justify-center rounded border border-gray-200 p-4">
                            <img src={`/storage/${aparData.foto_apar}`} alt="Foto APAR" className="max-w-2xl" />
                        </div>
                    ) : (
                        <div className="bg-muted flex h-full w-full items-center justify-center overflow-hidden rounded">
                            <span className="text-muted-foreground text-sm"> Tidak ada foto</span>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <Button variant={'outline'} asChild>
                        <Link href={route('apar.index')}>Kembali</Link>
                    </Button>
                    <div className="flex space-x-2">
                        <Button variant="outline" asChild>
                            <Link href={route('inspection.apar.edit', { id: aparData.id })} className="flex items-center space-x-1">
                                Edit Data <SquarePen size={16} />
                            </Link>
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </AppLayout>
    );
}
