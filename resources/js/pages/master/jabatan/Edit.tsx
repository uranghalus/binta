import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { LoaderIcon } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import { Department } from '../departments/data/departmentSchema';
import { Jabatan } from './data/jabatanSchema';

interface Props {
    departments: Department[];
    jabatan: Jabatan;
}

export default function Edit({ departments, jabatan }: Props) {
    const {
        data,
        setData,
        patch,
        processing,
        errors: zodError,
    } = useForm({
        nama_jabatan: jabatan.nama_jabatan || '',
        department_id: jabatan.department_id ? jabatan.department_id.toString() : '',
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
                        <div className="grid gap-2">
                            <Label htmlFor="department_id" className="text-sm font-medium">
                                Departemen
                            </Label>
                            <Select value={data.department_id} onValueChange={(value) => setData('department_id', value)}>
                                <SelectTrigger id="department_id" className="w-full">
                                    <SelectValue placeholder="Pilih departemen" />
                                </SelectTrigger>
                                <SelectContent>
                                    {departments.map((dept) =>
                                        dept.id !== undefined ? (
                                            <SelectItem key={dept.id} value={dept.id.toString()}>
                                                {dept.name} ({dept.department_code})
                                            </SelectItem>
                                        ) : null,
                                    )}
                                </SelectContent>
                            </Select>
                            {zodError.department_id && <p className="text-xs text-red-500">{zodError.department_id}</p>}
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
