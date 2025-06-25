/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
    useEffect(() => {
        if (hydrantData?.id) {
            setData('hydrant_id', hydrantData.id.toString());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hydrantData]);
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
                    <CardTitle>Form Inspeksi Apar</CardTitle>
                    <CardDescription className="text-muted-foreground">Tambah data inspeksi apar</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <h2 className="font-bold text-gray-800">Data Hydrantr</h2>
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
                                <Label className="text-sm font-bold">Jenis Hydrant</Label>
                                <div className="text-muted-foreground">{hydrantData.tipe}</div>
                            </div>
                            <Input type="hidden" value={String(hydrantData.id)} onChange={(e) => setData('hydrant_id', e.target.value)} />
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
