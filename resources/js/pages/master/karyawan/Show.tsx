import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { MapPin, SquarePen } from 'lucide-react';
import { Karyawan } from './data/karyawanSchema';

interface Props {
    karyawan: Karyawan;
}

export default function Show({ karyawan }: Props) {
    if (!karyawan || !karyawan.id_karyawan) {
        return <div>Data tidak tersedia</div>;
    }

    return (
        <AppLayout title="Lihat Detail Karyawan">
            <Head title="Lihat Detail Karyawan" />
            <Card>
                <CardHeader>
                    <CardTitle>Detail Karyawan</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Kolom Kiri: Data Text */}
                    <div className="space-y-4 rounded border border-gray-200 p-4">
                        {/* Data Pribadi */}
                        <div className="space-y-2">
                            <h2 className="font-bold text-gray-800">Data Pribadi</h2>
                            <Separator />
                            <div className="grid gap-1">
                                <Label className="text-sm font-bold">NIK</Label>
                                <div className="text-muted-foreground">{karyawan.nik}</div>
                            </div>
                            <div className="grid gap-1">
                                <Label className="text-sm font-bold">Nama</Label>
                                <div className="text-muted-foreground">{karyawan.nama}</div>
                            </div>
                            {karyawan.nama_alias && (
                                <div className="grid gap-1">
                                    <Label className="text-sm font-bold">Nama Alias</Label>
                                    <div className="text-muted-foreground">{karyawan.nama_alias}</div>
                                </div>
                            )}
                            <div className="grid gap-1">
                                <Label className="text-sm font-bold">Jenis Kelamin</Label>
                                <div className="text-muted-foreground">{karyawan.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</div>
                            </div>
                            <div className="grid gap-1">
                                <Label className="text-sm font-bold">Alamat</Label>
                                <div className="text-muted-foreground flex items-center gap-1">
                                    <MapPin className="size-4" />
                                    {karyawan.alamat ?? '-'}
                                </div>
                            </div>
                            {karyawan.no_ktp && (
                                <div className="grid gap-1">
                                    <Label className="text-sm font-bold">No. KTP</Label>
                                    <div className="text-muted-foreground">{karyawan.no_ktp}</div>
                                </div>
                            )}
                            {karyawan.telp && (
                                <div className="grid gap-1">
                                    <Label className="text-sm font-bold">No. Telepon</Label>
                                    <div className="text-muted-foreground">{karyawan.telp}</div>
                                </div>
                            )}
                        </div>

                        {/* Data Pekerjaan */}
                        <div className="space-y-2">
                            <h2 className="font-bold text-gray-800">Data Pekerjaan</h2>
                            <Separator />
                            <div className="grid gap-1">
                                <Label className="text-sm font-bold">Department</Label>
                                <div className="text-muted-foreground">{karyawan.department?.name ?? '-'}</div>
                            </div>
                            <div className="grid gap-1">
                                <Label className="text-sm font-bold">Jabatan</Label>
                                <div className="text-muted-foreground">{karyawan.jabatan?.nama_jabatan ?? '-'}</div>
                            </div>
                            {karyawan.call_sign && (
                                <div className="grid gap-1">
                                    <Label className="text-sm font-bold">Call Sign</Label>
                                    <div className="text-muted-foreground">{karyawan.call_sign}</div>
                                </div>
                            )}
                            <div className="grid gap-1">
                                <Label className="text-sm font-bold">Tanggal Masuk Kerja</Label>
                                <div className="text-muted-foreground">{karyawan.tmk ?? '-'}</div>
                            </div>
                            <div className="grid gap-1">
                                <Label className="text-sm font-bold">Status</Label>
                                <div className="text-muted-foreground capitalize">{karyawan.status_karyawan}</div>
                            </div>
                            {karyawan.keterangan && (
                                <div className="grid gap-1">
                                    <Label className="text-sm font-bold">Keterangan</Label>
                                    <div className="text-muted-foreground">{karyawan.keterangan}</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Kolom Kanan: Foto */}
                    {karyawan.user_image && typeof karyawan.user_image !== 'string' ? (
                        <div className="flex items-center justify-center rounded border border-gray-200 p-4">
                            <img src={URL.createObjectURL(karyawan.user_image)} alt={`Foto ${karyawan.nama}`} className="max-w-2xl" />
                        </div>
                    ) : karyawan.user_image && typeof karyawan.user_image === 'string' ? (
                        <div className="flex items-center justify-center rounded border border-gray-200 p-4">
                            <img src={karyawan.user_image} alt={`Foto ${karyawan.nama}`} className="max-w-2xl" />
                        </div>
                    ) : (
                        <div className="bg-muted flex h-full w-full items-center justify-center overflow-hidden rounded">
                            <span className="text-muted-foreground text-sm">Tidak ada foto</span>
                        </div>
                    )}
                </CardContent>

                <CardFooter className="flex items-center justify-between">
                    <Button variant="outline" asChild>
                        <Link href={route('karyawan.index')}>Kembali</Link>
                    </Button>
                    <div className="flex space-x-2">
                        <Button variant="outline" asChild>
                            <Link href={route('karyawan.edit', { id: karyawan.id_karyawan })} className="flex items-center space-x-1">
                                Edit Data <SquarePen size={16} />
                            </Link>
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </AppLayout>
    );
}
