import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { LoaderIcon } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import { Office } from '../offices/data/scheme';

interface Department {
    id: number;
    department_code: string;
    name: string;
    office_id: number | string;
}

interface Props {
    offices: Office[];
    department: Department;
}

export default function Edit({ offices, department }: Props) {
    const {
        data,
        setData,
        patch,
        processing,
        errors: zodError,
    } = useForm({
        department_code: department.department_code || '',
        name: department.name || '',
        office_id: department.office_id ? department.office_id.toString() : '',
    });

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('departemen.update', department.id), {
            onSuccess: () => {
                toast.success('Data berhasil diubah!', { description: 'Department berhasil diperbarui.' });
            },
            preserveScroll: true,
        });
    };

    return (
        <AppLayout title="Edit Department">
            <Head title="Edit Department" />
            <Card>
                <CardHeader>
                    <CardTitle>Edit Department</CardTitle>
                    <CardDescription className="text-muted-foreground">Ubah Data Department</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-4 p-0.5">
                        <div className="grid gap-2">
                            <Label htmlFor="department_code" className="text-sm font-medium">
                                Kode Departemen
                            </Label>
                            <Input
                                type="text"
                                id="department_code"
                                name="department_code"
                                value={data.department_code}
                                onChange={(e) => setData('department_code', e.target.value)}
                                className={`input ${zodError.department_code ? 'input-error' : ''}`}
                                placeholder="Masukkan kode departemen"
                            />
                            {zodError.department_code && <p className="text-xs text-red-500">{zodError.department_code}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="text-sm font-medium">
                                Nama Departemen
                            </Label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={`input ${zodError.name ? 'input-error' : ''}`}
                                placeholder="Masukkan nama departemen"
                            />
                            {zodError.name && <p className="text-xs text-red-500">{zodError.name}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="office_id" className="text-sm font-medium">
                                Kantor
                            </Label>
                            <Select value={data.office_id} onValueChange={(value) => setData('office_id', value)}>
                                <SelectTrigger id="office_id" className="w-full">
                                    <SelectValue placeholder="Pilih kantor" />
                                </SelectTrigger>
                                <SelectContent>
                                    {offices.map((office) =>
                                        office.id !== undefined ? (
                                            <SelectItem key={office.id} value={office.id.toString()}>
                                                {office.name} ({office.office_code})
                                            </SelectItem>
                                        ) : null,
                                    )}
                                </SelectContent>
                            </Select>
                            {zodError.office_id && <p className="text-xs text-red-500">{zodError.office_id}</p>}
                        </div>
                        <div className="flex items-center justify-between pt-2">
                            <Button variant={'outline'} asChild>
                                <a href={route('departemen.index')}>Kembali</a>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing && <LoaderIcon className="animate-spin" />}
                                Simpan Perubahan
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
