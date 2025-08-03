import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, useForm } from '@inertiajs/react';

import CameraInput from '@/components/camera-capture';
import RadioInputWithOther from '@/components/radio-input-with-other';
import { ChevronsUpDownIcon, LoaderIcon } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';
import { Hydrant } from '../../hydrant/data/hydrantSchema';
import { HydrantInspectionsc } from './data/HydrantInspectionsc';

interface Props {
    hydrants: Hydrant[];
    inspection: HydrantInspectionsc;
}

export default function Edit({ hydrants, inspection }: Props) {
    const [openHydrant, setOpenHydrant] = useState(false);
    const { processing, setData, data, errors } = useForm({
        hydrant_id: inspection.hydrant_id ? String(inspection.hydrant_id) : '',
        regu: inspection.regu,
        tanggal_inspeksi: inspection.tanggal_inspeksi,
        valve_machino_coupling: inspection.valve_machino_coupling || '',
        fire_hose_machino_coupling: inspection.fire_hose_machino_coupling || '',
        selang_hydrant: inspection.selang_hydrant || '',
        noozle_hydrant: inspection.noozle_hydrant || '',
        kaca_box_hydrant: inspection.kaca_box_hydrant || '',
        kunci_box_hydrant: inspection.kunci_box_hydrant || '',
        box_hydrant: inspection.box_hydrant || '',
        alarm: inspection.alarm || '',
        foto_hydrant: '', // ← ubah dari `null` ke `''`
    });

    const handleCapture = (image: string) => {
        setData('foto_hydrant', image);
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();

        // Tambahkan _method agar Laravel tahu ini PUT
        formData.append('_method', 'PUT');

        // Append semua data
        Object.entries(data).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                formData.append(key, value);
            }
        });

        // Gunakan router.post dan jangan set method secara langsung
        router.post(route('inspection.hydrant.update', { id: inspection.id }), formData, {
            onSuccess: () => {
                toast.success('Data berhasil diperbarui!', {
                    description: 'Inspeksi Hydrant berhasil diupdate.',
                });
            },
            onError: (err) => {
                toast.error('Gagal mengupdate data!', {
                    description: 'Terjadi kesalahan saat mengupdate data.',
                });
            },
            preserveScroll: true,
        });
    };

    return (
        <AppLayout title="Edit Inspeksi Hydrant">
            <Head title="Edit Inspeksi Hydrant" />
            <Card>
                <CardHeader>
                    <CardTitle>Edit Inspeksi Hydrant</CardTitle>
                    <CardDescription className="text-muted-foreground">Ubah data inspeksi hydrant</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2" id="editHydrantForm">
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="hydrantId">Hydrant</Label>
                                <Popover open={openHydrant} onOpenChange={setOpenHydrant}>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" role="combobox" aria-expanded={openHydrant} className="w-full justify-between">
                                            {hydrants.find((h: Hydrant) => h.id === Number(data.hydrant_id))?.kode_hydrant || 'Pilih Hydrant'}
                                            <ChevronsUpDownIcon className="ml-2 h-4 w-4 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0">
                                        <Command>
                                            <CommandInput placeholder="Cari Hydrant..." />
                                            <CommandList>
                                                <CommandEmpty>Tidak ada hydrant</CommandEmpty>
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
                                <Label htmlFor="regu">Regu</Label>
                                <Select value={data.regu} onValueChange={(value) => setData('regu', value as any)}>
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

                            {[
                                'selang_hydrant',
                                'noozle_hydrant',
                                'valve_machino_coupling',
                                'fire_hose_machino_coupling',
                                'kunci_box_hydrant',
                                'kaca_box_hydrant',
                                'box_hydrant',
                                'alarm',
                            ].map((field) => (
                                <RadioInputWithOther
                                    key={field}
                                    label={field.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                                    name={field}
                                    value={(data as any)[field]}
                                    onChange={(val) => setData(field, val)}
                                    error={(errors as any)[field]}
                                />
                            ))}

                            <div className="grid gap-2">
                                <Label>Foto Hydrant (opsional)</Label>
                                <CameraInput onCapture={handleCapture} />
                                {errors.foto_hydrant && <p className="text-xs text-red-500">{errors.foto_hydrant}</p>}
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <Button variant="outline" asChild>
                        <Link href={route('inspection.hydrant.index')}>Kembali</Link>
                    </Button>
                    <Button type="submit" form="editHydrantForm" disabled={processing}>
                        {processing && <LoaderIcon className="animate-spin" />}
                        Simpan Perubahan
                    </Button>
                </CardFooter>
            </Card>
        </AppLayout>
    );
}
