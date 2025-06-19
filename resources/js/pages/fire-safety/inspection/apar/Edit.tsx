import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { toDisplayDate } from '@/lib/utils';
import { Head, Link, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarIcon, ChevronsUpDownIcon, LoaderIcon } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';
import { Apar } from '../../apar/data/aparSchema';
import { AparInspection } from './data/inspectionAparSchema';

interface Props {
    aparData: Apar[];
    aparInspection: AparInspection;
}

export default function Edit({ aparData, aparInspection }: Props) {
    const [openApar, setOpenApar] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(aparInspection.foto_apar ? `/storage/${aparInspection.foto_apar}` : null);

    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        apar_id: String(aparInspection.apar_id),
        regu: aparInspection.regu.toUpperCase().replace('Regu ', 'REGU ') as string,
        tanggal_kadaluarsa: aparInspection.tanggal_kadaluarsa ?? '',
        tanggal_refill: '', // kalau ada
        kondisi: aparInspection.kondisi ?? '',
        catatan: aparInspection.catatan ?? '',
        foto_apar: null as File | null,
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('inspection.apar.update', aparInspection.id), {
            onSuccess: () => toast.success('Data berhasil diperbarui!'),
            preserveScroll: true,
        });
    };

    return (
        <AppLayout title="Edit Inspeksi APAR">
            <Head title="Edit Inspeksi APAR" />

            <Card>
                <CardHeader>
                    <CardTitle>Edit Inspeksi APAR</CardTitle>
                    <CardDescription>Perbarui data inspeksi</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2" id="editForm">
                        <div className="space-y-4">
                            {/* Select APAR ID */}
                            <div className="grid gap-2">
                                <Label htmlFor="apar_id">ID APAR</Label>
                                <Popover open={openApar} onOpenChange={setOpenApar}>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="w-full justify-between">
                                            {aparData.find((a) => a.id === Number(data.apar_id))?.kode_apar || 'Pilih APAR'}
                                            <ChevronsUpDownIcon className="ml-2 h-4 w-4" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0">
                                        <Command>
                                            <CommandInput placeholder="Cari APAR..." />
                                            <CommandList>
                                                <CommandEmpty>Tidak ditemukan</CommandEmpty>
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

                            {/* Regu */}
                            <div className="grid gap-2">
                                <Label>Regu</Label>
                                <Select value={data.regu} onValueChange={(v) => setData('regu', v)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Regu" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="REGU A">REGU A</SelectItem>
                                        <SelectItem value="REGU B">REGU B</SelectItem>
                                        <SelectItem value="REGU C">REGU C</SelectItem>
                                        <SelectItem value="MIDDLE">MIDDLE</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Tanggal kadaluarsa */}
                            <div className="grid gap-2">
                                <Label htmlFor="tanggal_kadaluarsa">Tanggal Kadaluarsa</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="w-full justify-between text-left">
                                            {data.tanggal_kadaluarsa ? toDisplayDate(data.tanggal_kadaluarsa) : 'Pilih Tanggal'}
                                            <CalendarIcon />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent align="end">
                                        <Calendar
                                            mode="single"
                                            selected={data.tanggal_kadaluarsa ? new Date(data.tanggal_kadaluarsa) : undefined}
                                            onSelect={(date) => setData('tanggal_kadaluarsa', date ? format(date, 'yyyy-MM-dd') : '')}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/* Kondisi */}
                            <div className="grid gap-2">
                                <Label>Kondisi</Label>
                                <RadioGroup
                                    value={['Baik', 'Rusak'].includes(data.kondisi) ? data.kondisi : 'Yang Lain'}
                                    onValueChange={(value) => {
                                        if (value === 'Yang Lain') {
                                            setData('kondisi', '');
                                        } else {
                                            setData('kondisi', value);
                                        }
                                    }}
                                    className="flex gap-2"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Baik" id="baik" />
                                        <Label htmlFor="baik">Baik</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Rusak" id="rusak" />
                                        <Label htmlFor="rusak">Rusak</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Yang Lain" id="lain" />
                                        <Label htmlFor="lain">Lainnya</Label>
                                    </div>
                                </RadioGroup>
                                {!['Baik', 'Rusak'].includes(data.kondisi) && (
                                    <Input
                                        placeholder="Masukkan kondisi lain"
                                        value={data.kondisi}
                                        onChange={(e) => setData('kondisi', e.target.value)}
                                    />
                                )}
                            </div>

                            {/* Foto */}
                            <div className="grid gap-2">
                                <Label>Ganti Foto (Opsional)</Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setData('foto_apar', file);
                                            setPreviewUrl(URL.createObjectURL(file));
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        {/* Preview Foto */}
                        <div className="bg-muted flex items-center justify-center rounded">
                            {previewUrl ? (
                                <img src={previewUrl} alt="Preview" className="max-h-[300px] max-w-xs object-contain" />
                            ) : (
                                <span className="text-muted-foreground">Preview Foto</span>
                            )}
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" asChild>
                        <Link href={route('inspection.apar.index')}>Batal</Link>
                    </Button>
                    <Button type="submit" form="editForm" disabled={processing}>
                        {processing && <LoaderIcon className="mr-2 animate-spin" />}
                        Simpan Perubahan
                    </Button>
                </CardFooter>
            </Card>
        </AppLayout>
    );
}
