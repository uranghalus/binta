import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { LoaderIcon } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

export default function Create() {
    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors: zodErrors,
    } = useForm({
        office_code: '',
        name: '',
        address: '',
    });

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('unit-bisnis.store'), {
            onSuccess: () => {
                toast.success('Data berhasil ditambahkan!', { description: 'Data Unit Bisnis berhasil ditambah.' });
                reset();
            },
        });
    };

    return (
        <AppLayout title="Tambah Unit Bisnis">
            <Head title="Tambah Unit Bisnis" />
            <Card>
                <form onSubmit={onSubmit} className="space-y-4" id="unitbisnisForm">
                    <CardHeader>
                        <CardTitle>Tambah Unit Bisnis</CardTitle>
                        <CardDescription className="text-muted-foreground">Tambah Data Unit Bisnis</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="office_code">Office Code</Label>
                            <Input id="office_code" value={data.office_code} onChange={(e) => setData('office_code', e.target.value)} />
                            {zodErrors.office_code && <p className="text-sm text-red-500">{zodErrors.office_code}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="name">Office Name</Label>
                            <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                            {zodErrors.name && <p className="text-sm text-red-500">{zodErrors.name}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="address">Location</Label>
                            <Input id="address" value={data.address} onChange={(e) => setData('address', e.target.value)} />
                            {zodErrors.address && <p className="text-sm text-red-500">{zodErrors.address}</p>}
                        </div>
                    </CardContent>

                    <CardFooter className="flex items-center justify-between">
                        <Button variant="outline" asChild>
                            <a href={route('unit-bisnis.index')}>Kembali</a>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing && <LoaderIcon className="mr-2 animate-spin" />}
                            Simpan
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </AppLayout>
    );
}
