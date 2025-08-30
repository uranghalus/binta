import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';

import CameraCapture from '@/components/camera-capture';
import RadioInputWithOther from '@/components/radio-input-with-other';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { toDisplayDate } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, ChevronsUpDownIcon, LoaderIcon } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';
import { Apar } from '../../apar/data/aparSchema';

interface Props {
    aparData: Apar[];
}
export default function Create({ aparData }: Props) {
    const [openApar, setOpenApar] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const { post, processing, reset, data, setData, errors } = useForm<{
        apar_id: string;
        nama_petugas: string;
        regu: 'PAGI' | 'MIDDLE' | 'SIANG' | 'MALAM';
        tanggal_kadaluarsa: string;
        tanggal_refill: string;
        kondisi: string;
        catatan: string;
        foto_apar: string | File | null;
    }>({
        apar_id: '',
        regu: 'PAGI',
        nama_petugas: '',
        tanggal_kadaluarsa: '',
        tanggal_refill: '',
        kondisi: '',
        catatan: '',
        foto_apar: null,
    });
    const handleCapture = (file: File) => {
        setData('foto_apar', file);
        setPreviewUrl(URL.createObjectURL(file));
    };
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('inspection.apar.store'), {
            forceFormData: true, // WAJIB agar file dikirim sebagai FormData
            onSuccess: () => {
                toast.success('Data berhasil ditambahkan!', { description: 'Data APAR berhasil ditambah.' });
                reset();
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
                            <div className="grid gap-2">
                                <Label htmlFor="aparId" className="block text-sm font-medium text-gray-700">
                                    ID Apar
                                </Label>
                                <Popover open={openApar} onOpenChange={setOpenApar}>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" role="combobox" aria-expanded={openApar} className="w-full justify-between">
                                            {data.apar_id
                                                ? aparData.find((a: Apar) => a.id === Number(data.apar_id))?.kode_apar || 'Pilih Apar'
                                                : 'Pilih Apar'}
                                            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0">
                                        <Command>
                                            <CommandInput placeholder="Cari Apar..." />
                                            <CommandList>
                                                <CommandEmpty>Tidak ada apar yang ditemukan</CommandEmpty>
                                                <CommandGroup>
                                                    {aparData.map((apar) => (
                                                        <CommandItem
                                                            key={apar.id}
                                                            onSelect={() => {
                                                                setData('apar_id', String(apar.id));
                                                                setOpenApar(false);
                                                            }}
                                                        >
                                                            {apar.kode_apar} - {apar.lokasi}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                {errors.apar_id && <p className="text-xs text-red-500">{errors.apar_id}</p>}
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
