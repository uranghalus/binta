import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

export default function Create() {
    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors: zodError,
    } = useForm({
        kode_cekpoint: '',
        lokasi: '',
        lantai: '',
        area: '',
    });
    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('cekpoin-security.store'), {
            onSuccess: () => {
                toast.success('Data berhasil ditambahkan!', { description: 'Cekpoint berhasil ditambah.' });
                reset();
            },
            preserveScroll: true,
        });
    };
    return (
        <AppLayout title="Tambah Cekpoint Security">
            <Head title="Tambah Cekpoint Security" />
            <Card>
                <CardHeader>
                    <CardTitle>Tambah Cekpoint Security</CardTitle>
                    <CardDescription className="text-muted-foreground">Tambah Data Cekpoint Security</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-4 p-0.5" id="cpForm">
                        <div className="grid gap-2">
                            <Label htmlFor="kode_cekpoint" className="text-sm font-medium">
                                Kode Cekpoin
                            </Label>
                            <Input
                                type="text"
                                id="kode_cekpoint"
                                name="kode_cekpoint"
                                value={data.kode_cekpoint}
                                onChange={(e) => setData('kode_cekpoint', e.target.value)}
                                className={`input ${zodError.kode_cekpoint ? 'input-error' : ''}`}
                                placeholder="Masukkan Kode Cekpoint Security"
                            />
                            {zodError.kode_cekpoint && <p className="text-xs text-red-500">{zodError.kode_cekpoint}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="lokasi" className="text-sm font-medium">
                                Lokasi
                            </Label>
                            <Input
                                type="text"
                                id="lokasi"
                                name="lokasi"
                                value={data.lokasi}
                                onChange={(e) => setData('lokasi', e.target.value)}
                                className={`input ${zodError.lokasi ? 'input-error' : ''}`}
                                placeholder="Masukkan Lokasi Cekpoint"
                            />
                            {zodError.lokasi && <p className="text-xs text-red-500">{zodError.lokasi}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="lantai" className="text-sm font-medium">
                                Lokasi
                            </Label>
                            <Input
                                type="text"
                                id="lantai"
                                name="lantai"
                                value={data.lantai}
                                onChange={(e) => setData('lantai', e.target.value)}
                                className={`input ${zodError.lantai ? 'input-error' : ''}`}
                                placeholder="Masukkan Nama Lantai"
                            />
                            {zodError.lantai && <p className="text-xs text-red-500">{zodError.lantai}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="area">Area</Label>
                            <Select value={data.area} onValueChange={(val) => setData('area', val)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Ring Luar">Ring Luar</SelectItem>
                                    <SelectItem value="Ring Dalam">Ring Dalam</SelectItem>
                                </SelectContent>
                            </Select>
                            {zodError.area && <p className="text-xs text-red-500">{zodError.area}</p>}
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" asChild>
                        <Link href={route('cekpoin-security.index')}>Kembali</Link>
                    </Button>
                    <Button type="submit" form="cpForm" disabled={processing}>
                        Simpan
                    </Button>
                </CardFooter>
            </Card>
        </AppLayout>
    );
}
