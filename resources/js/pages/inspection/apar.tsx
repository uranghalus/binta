/* eslint-disable react-hooks/rules-of-hooks */
import CameraCapture from '@/components/camera-capture';
import RadioInputWithOther from '@/components/radio-input-with-other';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { toDisplayDate } from '@/lib/utils';
import { Head, Link, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarIcon, LoaderIcon, MapPin } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Apar } from '../fire-safety/apar/data/aparSchema';

interface Props {
    aparData: Apar;
}
export default function apar({ aparData }: Props) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const { post, processing, reset, data, setData, errors } = useForm<{
        apar_id: string;
        nama_petugas: string;
        regu: string;
        tanggal_kadaluarsa: string;
        tanggal_refill: string;
        kondisi: string;
        catatan: string;
        foto_apar: string | File | null;
    }>({
        apar_id: '',
        regu: ['PAGI', 'SIANG', 'MALAM', 'MIDDLE'][0],
        nama_petugas: '',
        tanggal_kadaluarsa: '',
        tanggal_refill: '',
        kondisi: '',
        catatan: '',
        foto_apar: null,
    });
    useEffect(() => {
        if (aparData?.id) {
            setData('apar_id', aparData.id.toString());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [aparData]);
    const handleCapture = (image: string) => {
        setData('foto_apar', image); // base64 image
        setPreviewUrl(image);
    };
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('inspection.apar.store'), {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Data berhasil ditambahkan!', { description: 'Data APAR berhasil ditambah.' });
                reset();
            },
            onError: () => {
                toast.error('Data gagal ditambahkan!', { description: 'Data APAR gagal ditambahkan' });
                console.log('error', errors);
            },
            preserveScroll: true,
        });
    };
    return (
        <AppLayout title="Form Inspeksi Apar">
            <Head title="Form Inspeksi Apar" />
            <Card>
                <CardHeader>
                    <CardTitle>Form Inspeksi Apar</CardTitle>
                    <CardDescription className="text-muted-foreground">Tambah data inspeksi apar</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2" id="inspeksiForm">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <h2 className="font-bold text-gray-800">Data Apar</h2>
                                <Separator />
                                <div className="grid gap-1">
                                    <Label className="text-sm font-bold">Kode Apar</Label>
                                    <div className="text-muted-foreground">{aparData.kode_apar}</div>
                                </div>
                                <div className="grid gap-1">
                                    <Label className="text-sm font-bold">Lokasi Apar</Label>
                                    <div className="text-muted-foreground flex items-center gap-1">
                                        <MapPin className="size-4" />
                                        {aparData.lokasi}
                                    </div>
                                </div>
                                <div className="grid gap-1">
                                    <Label className="text-sm font-bold">Jenis Apar</Label>
                                    <div className="text-muted-foreground">{aparData.jenis}</div>
                                </div>
                                <Input type="hidden" value={String(aparData.id)} onChange={(e) => setData('apar_id', e.target.value)} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="regu">Shift</Label>
                                <Select
                                    value={data.regu}
                                    onValueChange={(value) => setData('regu', value as 'PAGI' | 'MIDDLE' | 'SIANG' | 'MALAM')}
                                    defaultValue={data.regu}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Shift" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="PAGI">PAGI</SelectItem>
                                        <SelectItem value="MIDDLE">MIDDLE</SelectItem>
                                        <SelectItem value="SIANG">SIANG</SelectItem>
                                        <SelectItem value="MALAM">MALAM</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.regu && <p className="text-xs text-red-500">{errors.regu}</p>}
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
                            <div className="grid gap-2">
                                <Label htmlFor="tanggal_kadaluarsa">Tanggal Kadaluarsa</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={'outline'}
                                            data-empty={!data.tanggal_kadaluarsa}
                                            className="data-[empty=true]:text-muted-foreground w-full justify-between text-left font-normal"
                                        >
                                            {data.tanggal_kadaluarsa ? toDisplayDate(data.tanggal_kadaluarsa) : <span>Pilih Tanggal</span>}
                                            <CalendarIcon />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto" align="end">
                                        <Calendar
                                            mode="single"
                                            selected={data.tanggal_kadaluarsa ? new Date(data.tanggal_kadaluarsa) : undefined}
                                            onSelect={(value) => setData('tanggal_kadaluarsa', value ? format(value, 'yyyy-MM-dd') : '')}
                                        />
                                    </PopoverContent>
                                </Popover>
                                {errors.tanggal_kadaluarsa && <p className="text-xs text-red-500">{errors.tanggal_kadaluarsa}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="tanggal_kadaluarsa">Tanggal Refill</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={'outline'}
                                            data-empty={!data.tanggal_refill}
                                            className="data-[empty=true]:text-muted-foreground w-full justify-between text-left font-normal"
                                        >
                                            {data.tanggal_refill ? toDisplayDate(data.tanggal_refill) : <span>Pilih Tanggal</span>}
                                            <CalendarIcon />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto" align="end">
                                        <Calendar
                                            mode="single"
                                            selected={data.tanggal_refill ? new Date(data.tanggal_refill) : undefined}
                                            onSelect={(value) => setData('tanggal_refill', value ? format(value, 'yyyy-MM-dd') : '')}
                                        />
                                    </PopoverContent>
                                </Popover>
                                {errors.tanggal_refill && <p className="text-xs text-red-500">{errors.tanggal_refill}</p>}
                            </div>
                            <RadioInputWithOther
                                label="Kondisi Apar"
                                name="kondisi_apar"
                                value={data.kondisi}
                                onChange={(val) => setData('kondisi', val)}
                                error={errors.kondisi}
                            />
                            <div className="grid gap-2">
                                <Label htmlFor="foto">Foto Kondisi</Label>
                                <CameraCapture onCapture={handleCapture} />
                                {errors.foto_apar && <p className="text-xs text-red-500">{errors.foto_apar}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="catatan">Catatan</Label>
                                <Textarea
                                    placeholder="Masukkan catatan inspeksi di sini..."
                                    value={data.catatan}
                                    onChange={(e) => setData('catatan', e.target.value)}
                                    name="catatan"
                                    className="resize-none"
                                    rows={3}
                                />
                            </div>
                        </div>
                        <div className="bg-muted flex h-full w-full items-center justify-center overflow-hidden rounded">
                            {previewUrl ? (
                                <img src={previewUrl} alt="Preview Foto" className="max-h-full max-w-full object-contain" />
                            ) : (
                                <span className="text-muted-foreground text-sm">Preview foto akan muncul di sini</span>
                            )}
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
