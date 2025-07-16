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
import { Office } from '../offices/data/scheme';

interface Props {
    offices: Office[];
}
export default function Create({ offices }: Props) {
    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors: zodError,
    } = useForm({
        department_code: '',
        name: '',
        office_id: '',
    });
    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('departemen.store'), {
            onSuccess: () => {
                toast.success('Data berhasil ditambahkan!', { description: 'Department berhasil ditambah.' });
                reset();
            },
            preserveScroll: true,
        });
    };
    return (
        <AppLayout title="Tambah Department">
            <Head title="Tambah Department" />
            <Card>
                <CardHeader>
                    <CardTitle>Tambah Permission</CardTitle>
                    <CardDescription className="text-muted-foreground">Tambah Data Permission</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-4 p-0.5" id="departmentForm">
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
                            <Select value={data.office_id ? data.office_id.toString() : ''} onValueChange={(value) => setData('office_id', value)}>
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
                    </form>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <Button variant={'outline'} asChild>
                        <a href={route('departemen.index')}>Kembali</a>
                    </Button>
                    <Button type="submit" form="departmentForm" disabled={processing}>
                        {processing && <LoaderIcon className="animate-spin" />}
                        Simpan
                    </Button>
                </CardFooter>
            </Card>
        </AppLayout>
    );
}
