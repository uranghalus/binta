import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { LoaderIcon } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

export default function Create() {
    const { post, processing, reset, data, setData } = useForm({
        kode_apar: '',
        lokasi: '',
        jenis: ['CO2', 'Powder', 'Foam', 'Air'][0], // Default to first option
        size: ['2', '4', '6', '9'][0], // Default to first option
    });

    const [zodError, setZodError] = useState<Record<string, string>>({});

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('apar.store'), {
            onSuccess: () => {
                toast.success('Data berhasil ditambahkan!', { description: 'Data APAR berhasil ditambah.' });
                reset();
            },
            onError: (errors) => {
                console.log(errors);
                setZodError(errors);
            },
            preserveScroll: true,
        });
    };

    return (
        <AppLayout title="Master APAR">
            <Head title="Tambah APAR" />
            <Card>
                <CardHeader>
                    <CardTitle>Tambah APAR</CardTitle>
                    <CardDescription className="text-muted-foreground">Tambah Data APAR</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2" id="aparForm">
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="kode_apar">Kode APAR</Label>
                                <Input id="kode_apar" value={data.kode_apar} onChange={(e) => setData('kode_apar', e.target.value)} />
                                {zodError.kode_apar && <p className="text-xs text-red-500">{zodError.kode_apar}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="lokasi">Lokasi</Label>
                                <Input id="lokasi" value={data.lokasi} onChange={(e) => setData('lokasi', e.target.value)} />
                                {zodError.lokasi && <p className="text-xs text-red-500">{zodError.lokasi}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="jenis">Jenis</Label>
                                <Select value={data.jenis} onValueChange={(value) => setData('jenis', value)} defaultValue={data.jenis}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Jenis Apar" />
                                        <SelectContent>
                                            <SelectItem value="CO2">CO2</SelectItem>
                                            <SelectItem value="Powder">Powder</SelectItem>
                                            <SelectItem value="Foam">Foam</SelectItem>
                                            <SelectItem value="Air">Air</SelectItem>
                                        </SelectContent>
                                    </SelectTrigger>
                                </Select>
                                {zodError.jenis && <p className="text-xs text-red-500">{zodError.jenis}</p>}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="size">Size</Label>
                                <Select value={data.size} onValueChange={(value) => setData('size', value)} defaultValue={data.size}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Ukuran Apar" />
                                        <SelectContent>
                                            <SelectItem value="2">2 Kg</SelectItem>
                                            <SelectItem value="4">4 Kg</SelectItem>
                                            <SelectItem value="6">6 Kg</SelectItem>
                                            <SelectItem value="9">9 Kg</SelectItem>
                                        </SelectContent>
                                    </SelectTrigger>
                                </Select>

                                {zodError.size && <p className="text-xs text-red-500">{zodError.size}</p>}
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <Button variant={'outline'} asChild>
                        <a href={route('apar.index')}>Kembali</a>
                    </Button>
                    <Button type="submit" form="aparForm" disabled={processing}>
                        {processing && <LoaderIcon className="animate-spin" />}
                        Simpan
                    </Button>
                </CardFooter>
            </Card>
        </AppLayout>
    );
}
