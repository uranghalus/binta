import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multi-select';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { LoaderIcon } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

interface Props {
    roles: string[];
}
export default function Create({ roles }: Props) {
    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors: zodError,
    } = useForm({
        nama_jabatan: '',
        roles: [] as string[],
    });

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('jabatan.store'), {
            onSuccess: () => {
                toast.success('Data berhasil ditambahkan!', { description: 'Jabatan berhasil ditambah.' });
                reset();
            },
            preserveScroll: true,
        });
    };

    return (
        <AppLayout title="Tambah Jabatan">
            <Head title="Tambah Jabatan" />
            <Card>
                <CardHeader>
                    <CardTitle>Tambah Jabatan</CardTitle>
                    <CardDescription className="text-muted-foreground">Tambah Data Jabatan</CardDescription>
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
                        <div className="grid gap-2">
                            <Label htmlFor="role" className="text-sm font-medium">
                                Hak Akses
                            </Label>
                            <MultiSelect
                                options={roles.map((role) => ({ label: role, value: role }))}
                                defaultValue={data.roles}
                                onValueChange={(value) => setData('roles', value)}
                                placeholder="Pilih Role"
                                className="w-full"
                            />
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <Button variant={'outline'} asChild>
                        <a href={route('jabatan.index')}>Kembali</a>
                    </Button>
                    <Button type="submit" form="jabatanForm" disabled={processing}>
                        {processing && <LoaderIcon className="animate-spin" />}
                        Simpan
                    </Button>
                </CardFooter>
            </Card>
        </AppLayout>
    );
}
