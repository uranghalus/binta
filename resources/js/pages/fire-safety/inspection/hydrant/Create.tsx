import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';

import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
        regu: string;
        tanggal_inspeksi: string;
        selang_hydrant: string;
        noozle_hydrant: string;
        kaca_box_hydrant: string;
    }>({
        hydrant_id: '',
        regu: ['Regu A', 'Regu B', 'Regu C', 'MIDDLE'][0],
        tanggal_inspeksi: '',
        selang_hydrant: '',
        noozle_hydrant: '',
        kaca_box_hydrant: '',
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('inspection.hydrant.store'), {
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
                                <Label htmlFor="regu">Regu</Label>
                                <Select value={data.regu} onValueChange={(value) => setData('regu', value)} defaultValue={data.regu}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Regu" />
                                        <SelectContent>
                                            <SelectItem value="Regu A">Regu A</SelectItem>
                                            <SelectItem value="Regu B">Regu B</SelectItem>
                                            <SelectItem value="Regu C">Regu C</SelectItem>
                                            <SelectItem value="MIDDLE">MIDDLE</SelectItem>
                                        </SelectContent>
                                    </SelectTrigger>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label>Selang Hydrant</Label>
                                <RadioGroup
                                    value={['Ada', 'Tidak Ada'].includes(data.selang_hydrant) ? data.selang_hydrant : 'Yang Lain'}
                                    onValueChange={(value) => {
                                        if (value === 'Yang Lain') {
                                            setData('selang_hydrant', ''); // kosongkan agar user isi manual
                                        } else {
                                            setData('selang_hydrant', value);
                                        }
                                    }}
                                    className="flex gap-2 p-2"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Ada" id="ada" />
                                        <Label htmlFor="ada">Ada</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Tidak Ada" id="tidak-ada" />
                                        <Label htmlFor="tidak-ada">Tidak Ada</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Yang Lain" id="kondisi-lain" />
                                        <Label htmlFor="kondisi-lain">Yang Lain</Label>
                                    </div>
                                </RadioGroup>

                                {['Ada', 'Tidak Ada'].includes(data.selang_hydrant) === false && (
                                    <Input
                                        type="text"
                                        name="selang_hydrant"
                                        placeholder="Masukkan kondisi lain..."
                                        value={data.selang_hydrant}
                                        onChange={(e) => setData('selang_hydrant', e.target.value)}
                                    />
                                )}

                                {errors.selang_hydrant && <p className="text-xs text-red-500">{errors.selang_hydrant}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label>Noozle Hydrant</Label>
                                <RadioGroup
                                    value={['Ada', 'Tidak Ada'].includes(data.noozle_hydrant) ? data.noozle_hydrant : 'Yang Lain'}
                                    onValueChange={(value) => {
                                        if (value === 'Yang Lain') {
                                            setData('noozle_hydrant', ''); // kosongkan agar user isi manual
                                        } else {
                                            setData('noozle_hydrant', value);
                                        }
                                    }}
                                    className="flex gap-2 p-2"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Ada" id="ada" />
                                        <Label htmlFor="ada">Ada</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Tidak Ada" id="tidak-ada" />
                                        <Label htmlFor="tidak-ada">Tidak Ada</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Yang Lain" id="kondisi-lain" />
                                        <Label htmlFor="kondisi-lain">Yang Lain</Label>
                                    </div>
                                </RadioGroup>

                                {['Ada', 'Tidak Ada'].includes(data.noozle_hydrant) === false && (
                                    <Input
                                        type="text"
                                        name="kondisi"
                                        placeholder="Masukkan kondisi lain..."
                                        value={data.noozle_hydrant}
                                        onChange={(e) => setData('noozle_hydrant', e.target.value)}
                                    />
                                )}

                                {errors.noozle_hydrant && <p className="text-xs text-red-500">{errors.noozle_hydrant}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label>Kondisi</Label>
                                <RadioGroup
                                    value={['Bagus', 'Rusak'].includes(data.kaca_box_hydrant) ? data.kaca_box_hydrant : 'Yang Lain'}
                                    onValueChange={(value) => {
                                        if (value === 'Yang Lain') {
                                            setData('kaca_box_hydrant', ''); // kosongkan agar user isi manual
                                        } else {
                                            setData('kaca_box_hydrant', value);
                                        }
                                    }}
                                    className="flex gap-2 p-2"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Bagus" id="bagus" />
                                        <Label htmlFor="bagus">Bagus</Label>
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

                                {['Bagus', 'Rusak'].includes(data.kaca_box_hydrant) === false && (
                                    <Input
                                        type="text"
                                        name="kondisi"
                                        placeholder="Masukkan kondisi lain..."
                                        value={data.kaca_box_hydrant}
                                        onChange={(e) => setData('kaca_box_hydrant', e.target.value)}
                                    />
                                )}

                                {errors.kaca_box_hydrant && <p className="text-xs text-red-500">{errors.kaca_box_hydrant}</p>}
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
