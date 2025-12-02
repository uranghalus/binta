/* eslint-disable react-hooks/rules-of-hooks */
import CameraInput from '@/components/camera-capture';
import RadioInputWithOther from '@/components/radio-input-with-other';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { LoaderIcon, MapPin } from 'lucide-react';
import { FormEvent, useEffect } from 'react';
import { toast } from 'sonner';
import { Hydrant } from '../fire-safety/hydrant/data/hydrantSchema';
interface Props {
    hydrantData: Hydrant;
}
export default function hydrant({ hydrantData }: Props) {
    const { post, processing, reset, data, setData, errors } = useForm<{
        hydrant_id: string;
        regu: 'PAGI' | 'MIDDLE' | 'SIANG' | 'MALAM';
        nama_petugas: string;
        tanggal_inspeksi: string;
        valve_machino_coupling: string;
        fire_hose_machino_coupling: string;
        selang_hydrant: string;
        noozle_hydrant: string;
        kaca_box_hydrant: string;
        kunci_box_hydrant: string;
        box_hydrant: string;
        alarm: string;
        foto_hydrant: File | null | string;
    }>({
        hydrant_id: '',
        regu: 'PAGI',
        nama_petugas: '',
        tanggal_inspeksi: '',
        valve_machino_coupling: '',
        fire_hose_machino_coupling: '',
        selang_hydrant: '',
        noozle_hydrant: '',
        kaca_box_hydrant: '',
        kunci_box_hydrant: '',
        box_hydrant: '',
        alarm: '',
        foto_hydrant: null,
    });
    useEffect(() => {
        if (hydrantData?.id) {
            setData('hydrant_id', hydrantData.id.toString());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hydrantData]);
    const handleCapture = (file: File) => {
        setData('foto_hydrant', file);
    };
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('inspection.hydrant.store'), {
            forceFormData: true, // WAJIB agar file dikirim sebagai FormData
            onSuccess: () => {
                toast.success('Data berhasil ditambahkan!', { description: 'Data Hydrant berhasil ditambah.' });
                reset();
            },
            onError: () => {
                toast.error('Data gagal ditambahkan!', { description: 'Data Hydrant gagal di tambah' });
                reset();
                console.log('Error', errors);
            },
            preserveScroll: true,
        });
    };
    return (
        <AppLayout title="Form Inspeksi Hydrant" >
            <Head title="Form Inspeksi Hydrant" />
            <Card>
                <CardHeader>
                    <CardTitle>Form Inspeksi Hydrant</CardTitle>
                    <CardDescription className="text-muted-foreground">Tambah data inspeksi Hydrant</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-4" id="inspeksiForm">
                        <div className="space-y-2">
                            <h2 className="font-bold text-gray-800">Data Hydrant</h2>
                            <Separator />
                            <div className="grid gap-1">
                                <Label className="text-sm font-bold">Kode Hydrant</Label>
                                <div className="text-muted-foreground">{hydrantData.kode_hydrant}</div>
                            </div>
                            <div className="grid gap-1">
                                <Label className="text-sm font-bold">Lokasi Hydrant</Label>
                                <div className="text-muted-foreground flex items-center gap-1">
                                    <MapPin className="size-4" />
                                    {hydrantData.lokasi}
                                </div>
                            </div>
                            <div className="grid gap-1">
                                <Label className="text-sm font-bold">Ukuran</Label>
                                <div className="text-muted-foreground">{hydrantData.ukuran}</div>
                            </div>
                            <Input type="hidden" value={String(hydrantData.id)} onChange={(e) => setData('hydrant_id', e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="regu">Regu</Label>
                            <Select
                                value={data.regu}
                                onValueChange={(value) => setData('regu', value as 'PAGI' | 'MIDDLE' | 'SIANG' | 'MALAM')}
                                defaultValue={data.regu[0] as 'PAGI' | 'MIDDLE' | 'SIANG' | 'MALAM' | undefined}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Regu" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="PAGI">PAGI</SelectItem>
                                    <SelectItem value="MIDDLE">MIDDLE</SelectItem>
                                    <SelectItem value="SIANG">SIANG</SelectItem>
                                    <SelectItem value="MALAM">MALAM</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="nama_petugas">Nama Petugas</Label>
                            <input
                                type="text"
                                name="nama_petugas"
                                id="nama_petugas"
                                value={data.nama_petugas}
                                onChange={(e) => setData('nama_petugas', e.target.value)}
                                className="w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                                placeholder="Masukkan nama petugas"
                            />
                            {errors.nama_petugas && <p className="text-xs text-red-500">{errors.nama_petugas}</p>}
                        </div>
                        <RadioInputWithOther
                            label="Selang Hydrant"
                            name="selang_hydrant"
                            value={data.selang_hydrant}
                            onChange={(val) => setData('selang_hydrant', val)}
                            error={errors.selang_hydrant}
                        />
                        <RadioInputWithOther
                            label="Noozle Hydrant"
                            name="noozle_hydrant"
                            value={data.noozle_hydrant}
                            onChange={(val) => setData('noozle_hydrant', val)}
                            error={errors.noozle_hydrant}
                        />
                        <RadioInputWithOther
                            label="Valve Machino Coupling"
                            name="valve_machino_coupling"
                            value={data.valve_machino_coupling}
                            onChange={(val) => setData('valve_machino_coupling', val)}
                            error={errors.valve_machino_coupling}
                        />
                        <RadioInputWithOther
                            label="Fire Hose Machino Coupling"
                            name="fire_hose_machino_coupling"
                            value={data.fire_hose_machino_coupling}
                            onChange={(val) => setData('fire_hose_machino_coupling', val)}
                            error={errors.fire_hose_machino_coupling}
                        />
                        <RadioInputWithOther
                            label="Kunci Box Hydrant"
                            name="kunci_box_hydrant"
                            value={data.kunci_box_hydrant}
                            onChange={(val) => setData('kunci_box_hydrant', val)}
                            error={errors.kunci_box_hydrant}
                        />
                        <RadioInputWithOther
                            label="Kaca Box Hydrant"
                            name="kaca_box_hydrant"
                            value={data.kaca_box_hydrant}
                            onChange={(val) => setData('kaca_box_hydrant', val)}
                            error={errors.kaca_box_hydrant}
                        />
                        <RadioInputWithOther
                            label="Box Hydrant"
                            name="box_hydrant"
                            value={data.box_hydrant}
                            onChange={(val) => setData('box_hydrant', val)}
                            error={errors.box_hydrant}
                        />
                        <RadioInputWithOther
                            label="Alarm"
                            name="alarm"
                            value={data.alarm}
                            onChange={(val) => setData('alarm', val)}
                            error={errors.alarm}
                        />

                        <div className="grid gap-2">
                            <Label>Foto Hydrant</Label>
                            {/* Komponen Kamera */}
                            <CameraInput onCapture={handleCapture} />

                            {errors.foto_hydrant && <p className="text-xs text-red-500">{errors.foto_hydrant}</p>}
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <Button variant={'outline'} asChild>
                        <Link href={route('apar.index')}>Kembali</Link>
                    </Button>
                    <Button type="submit" form="inspeksiForm" disabled={processing}>
                        {processing && <LoaderIcon className="animate-spin" />}
                        Simpan
                    </Button>
                </CardFooter>
            </Card>
        </AppLayout>
    );
}
