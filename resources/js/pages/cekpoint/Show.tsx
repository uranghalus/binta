import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { MapPin, SquarePen } from 'lucide-react';

interface Props {
    inspection: any;
}

export default function ShowInspectionCekpoint({ inspection }: Props) {
    if (!inspection || !inspection.id) {
        return <div>Data tidak tersedia</div>;
    }

    return (
        <AppLayout title="Lihat Detail Inspeksi Cekpoint">
            <Head title="Lihat Detail Inspeksi Cekpoint" />
            <Card>
                <CardHeader>
                    <CardTitle>Detail Inspeksi Cekpoint</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-4 rounded border border-gray-200 p-4">
                        {/* Data Cekpoint */}
                        <div className="space-y-2">
                            <h2 className="font-bold text-gray-800">Data Cekpoint</h2>
                            <Separator />
                            <div className="grid gap-1">
                                <Label className="text-sm font-bold">Nama Cekpoint</Label>
                                <div className="text-muted-foreground">{inspection.cek_point?.nama}</div>
                            </div>
                            <div className="grid gap-1">
                                <Label className="text-sm font-bold">Lokasi</Label>
                                <div className="text-muted-foreground flex items-center gap-1">
                                    <MapPin className="size-4" />
                                    {inspection.cek_point?.lokasi}
                                </div>
                            </div>
                        </div>

                        {/* Kondisi */}
                        <div className="space-y-2">
                            <h2 className="font-bold text-gray-800">Kondisi</h2>
                            <Separator />
                            {[
                                ['Kondisi Umum', inspection.kondisi],
                                ['Bocoran', inspection.bocoran],
                                ['Penerangan Lampu', inspection.penerangan_lampu],
                                ['Kerusakan Fasum', inspection.kerusakan_fasum],
                                ['Potensi Bahaya Api', inspection.potensi_bahaya_api],
                                ['Potensi Bahaya Ke Orang', inspection.potensi_bahaya_keorang],
                                ['Orang Mencurigakan', inspection.orang_mencurigakan],
                            ].map(([label, value]) => (
                                <div className="grid gap-1" key={label}>
                                    <Label className="text-sm font-bold">{label}</Label>
                                    <div className="text-muted-foreground">{value || '-'}</div>
                                </div>
                            ))}
                        </div>

                        {/* Petugas */}
                        <div className="space-y-2">
                            <h2 className="font-bold text-gray-800">Petugas</h2>
                            <Separator />
                            <div className="grid gap-1">
                                <Label className="text-sm font-bold">Nama Petugas</Label>
                                <div className="text-muted-foreground">{inspection.user?.karyawan?.nama} - {inspection.nama_petugas}</div>
                            </div>
                            <div className="grid gap-1">
                                <Label className="text-sm font-bold">Shift / Regu</Label>
                                <div className="text-muted-foreground">{inspection.regu}</div>
                            </div>
                            <div className="grid gap-1">
                                <Label className="text-sm font-bold">Tanggal Patroli</Label>
                                <div className="text-muted-foreground">
                                    {inspection.tanggal_patroli
                                        ? new Date(inspection.tanggal_patroli).toLocaleString('id-ID')
                                        : '-'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Foto-foto */}
                    <div className="space-y-4 rounded border border-gray-200 p-4">
                        <h2 className="font-bold text-gray-800">Foto Hasil Inspeksi</h2>
                        <Separator />
                        {[
                            ['Foto Kondisi Umum', inspection.foto_kondisi_url],
                            ['Foto Bocoran', inspection.foto_bocoran_url],
                            ['Foto Penerangan Lampu', inspection.foto_penerangan_lampu_url],
                            ['Foto Kerusakan Fasum', inspection.foto_kerusakan_fasum_url],
                            ['Foto Potensi Bahaya Api', inspection.foto_potensi_bahaya_api_url],
                            ['Foto Potensi Bahaya Ke Orang', inspection.foto_potensi_bahaya_keorang_url],
                            ['Foto Orang Mencurigakan', inspection.foto_orang_mencurigakan_url],
                        ].map(([label, foto], idx) => (
                            <div key={idx} className="grid gap-1">
                                <Label className="text-sm font-bold">{label}</Label>
                                {foto ? (
                                    <img
                                        src={foto as string}
                                        alt={label}
                                        className="max-h-40 w-auto rounded border"
                                    />
                                ) : (
                                    <div className="bg-muted flex h-32 w-full items-center justify-center rounded">
                                        <span className="text-muted-foreground text-sm">Tidak ada foto</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>

                <CardFooter className="flex items-center justify-between">
                    <Button variant="outline" asChild>
                        <Link href={route('inspection.cp-security.index')}>Kembali</Link>
                    </Button>
                    <div className="flex space-x-2">
                        <Button variant="outline" asChild>
                            <Link
                                href={route('inspection.cp-security.edit', { id: inspection.id })}
                                className="flex items-center space-x-1"
                            >
                                Edit Data <SquarePen size={16} />
                            </Link>
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </AppLayout>
    );
}
