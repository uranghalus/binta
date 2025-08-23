import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';

import CameraInput from '@/components/camera-capture';
import RadioInputWithOther from '@/components/radio-input-with-other';
import { ChevronsUpDownIcon, LoaderIcon } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';
import { Hydrant } from '../../hydrant/data/hydrantSchema';

interface Props {
    hydrants: Hydrant[];
}
export default function Create({ hydrants }: Props) {
    const [openHydrant, setOpenHydrant] = useState(false);
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
        foto_hydrant: string | null;
    }>({
        hydrant_id: '',
        nama_petugas: '',
        regu: 'PAGI',
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
    const handleCapture = (image: string) => {
        setData('foto_hydrant', image); // base64 image
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
        <AppLayout title="Form Inspeksi Hydrant">
            <Head title="Form Inspeksi Hydrant" />
            <Card>
                <CardHeader>
                    <CardTitle>Form Inspeksi Hydrant</CardTitle>
                    <CardDescription className="text-muted-foreground">Tambah data inspeksi hydrant</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2" id="inspeksiHydrantForm">
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="hydrantId" className="block text-sm font-medium text-gray-700">
                                    Hydrant
                                </Label>
                                <Popover open={openHydrant} onOpenChange={setOpenHydrant}>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" role="combobox" aria-expanded={openHydrant} className="w-full justify-between">
                                            {data.hydrant_id
                                                ? hydrants.find((h: Hydrant) => h.id === Number(data.hydrant_id))?.kode_hydrant || 'Pilih Hydrant'
                                                : 'Pilih Hydrant'}
                                            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0">
                                        <Command>
                                            <CommandInput placeholder="Cari Hydrant..." />
                                            <CommandList>
                                                <CommandEmpty>Tidak ada hydrant yang ditemukan</CommandEmpty>
                                                <CommandGroup>
                                                    {hydrants.map((hydrant) => (
                                                        <CommandItem
                                                            key={hydrant.id}
                                                            onSelect={() => {
                                                                setData('hydrant_id', String(hydrant.id));
                                                                setOpenHydrant(false);
                                                            }}
                                                        >
                                                            {hydrant.kode_hydrant} - {hydrant.lokasi}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                {errors.hydrant_id && <p className="text-xs text-red-500">{errors.hydrant_id}</p>}
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
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <Button variant={'outline'} asChild>
                        <Link href={route('inspection.hydrant.index')}>Kembali</Link>
                    </Button>
                    <Button type="submit" form="inspeksiHydrantForm" disabled={processing}>
                        {processing && <LoaderIcon className="animate-spin" />}
                        Simpan
                    </Button>
                </CardFooter>
            </Card>
        </AppLayout>
    );
}
