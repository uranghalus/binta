/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
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
        regu: string;
        tanggal_kadaluarsa: string;
        tanggal_refill: string;
        kondisi: string;
        catatan: string;
        foto_apar: File | null;
    }>({
        apar_id: '',
        regu: ['REGU A', 'REGU B', 'REGU C', 'MIDDLE'][0],
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
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('inspection.apar.store'), {
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
                                <Label htmlFor="regu">Regu</Label>
                                <Select value={data.regu} onValueChange={(value) => setData('regu', value)} defaultValue={data.regu}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Regu" />
                                        <SelectContent>
                                            <SelectItem value="REGU A">REGU A</SelectItem>
                                            <SelectItem value="REGU B">REGU B</SelectItem>
                                            <SelectItem value="REGU C">REGU C</SelectItem>
                                            <SelectItem value="MIDDLE">MIDDLE</SelectItem>
                                        </SelectContent>
                                    </SelectTrigger>
                                </Select>
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
                            </div>
                            <div className="grid gap-2">
                                <Label>Kondisi</Label>
                                <RadioGroup
                                    value={['Baik', 'Rusak'].includes(data.kondisi) ? data.kondisi : 'Yang Lain'}
                                    onValueChange={(value) => {
                                        if (value === 'Yang Lain') {
                                            setData('kondisi', ''); // kosongkan agar user isi manual
                                        } else {
                                            setData('kondisi', value);
                                        }
                                    }}
                                    className="flex gap-2 p-2"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Baik" id="kondisi-baik" />
                                        <Label htmlFor="kondisi-baik">Baik</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Rusak" id="kondisi-rusak" />
                                        <Label htmlFor="kondisi-rusak">Rusak</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Yang Lain" id="kondisi-lain" />
                                        <Label htmlFor="kondisi-lain">Yang Lain</Label>
                                    </div>
                                </RadioGroup>

                                {['Baik', 'Rusak'].includes(data.kondisi) === false && (
                                    <Input
                                        type="text"
                                        name="kondisi"
                                        placeholder="Masukkan kondisi lain..."
                                        value={data.kondisi}
                                        onChange={(e) => setData('kondisi', e.target.value)}
                                    />
                                )}

                                {errors.kondisi && <p className="text-xs text-red-500">{errors.kondisi}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="foto">Foto Kondisi</Label>
                                <Input
                                    type="file"
                                    id="foto"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setData('foto_apar', file);
                                            const url = URL.createObjectURL(file);
                                            setPreviewUrl(url);
                                        }
                                    }}
                                />
                                {errors.foto_apar && <p className="text-xs text-red-500">{errors.foto_apar}</p>}
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
