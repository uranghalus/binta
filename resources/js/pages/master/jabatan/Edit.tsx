import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { LoaderIcon } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import { Jabatan } from './data/jabatanSchema';

interface Props {
    jabatan: Jabatan;
}

export default function Edit({ jabatan }: Props) {
    const {
        data,
        setData,
        patch,
        processing,
        errors: zodError,
    } = useForm({
        nama_jabatan: jabatan.nama_jabatan || '',
    });

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('jabatan.update', jabatan.id), {
            onSuccess: () => {
                toast.success('Data berhasil diubah!', { description: 'Jabatan berhasil diperbarui.' });
            },
            preserveScroll: true,
        });
    };

    return (
        <AppLayout title="Edit Jabatan">
            <Head title="Edit Jabatan" />
            <Card>
                <CardHeader>
                    <CardTitle>Edit Jabatan</CardTitle>
                    <CardDescription className="text-muted-foreground">Ubah Data Jabatan</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-4 p-0.5" id="jabatanForm">
                        <div className="grid gap-2">
                            <Label htmlFor="nama_jabatan" className="text-sm font-medium">
                                Nama Jabatan
                            </Label>
                            <Input
                                type="text"
                                id="nama_jabatan"
                                name="nama_jabatan"
                                value={data.nama_jabatan}
                                onChange={(e) => setData('nama_jabatan', e.target.value)}
                                className={`input ${zodError.nama_jabatan ? 'input-error' : ''}`}
                                placeholder="Masukkan nama jabatan"
                            />
                            {zodError.nama_jabatan && <p className="text-xs text-red-500">{zodError.nama_jabatan}</p>}
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <Button variant={'outline'} asChild>
                        <a href={route('jabatan.index')}>Kembali</a>
                    </Button>
                    <Button type="submit" form="jabatanForm" disabled={processing}>
                        {processing && <LoaderIcon className="animate-spin" />}
                        Simpan Perubahan
                    </Button>
                </CardFooter>
            </Card>
        </AppLayout>
    );
}
