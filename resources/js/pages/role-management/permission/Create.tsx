import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { LoaderIcon } from 'lucide-react';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

const actions = ['index', 'view', 'create', 'edit', 'update', 'delete'];

export default function Create() {
    const [selectedActions, setSelectedActions] = useState<string[]>([]);

    const [, setSelectAll] = useState(false);
    const {
        post,
        processing,
        reset,
        data,
        setData,
        errors: zodError,
    } = useForm({
        name: '',
        guard_name: 'web',
        permissions: [] as string[],
    });

    const toggleAction = (action: string) => {
        setSelectedActions((prev) => (prev.includes(action) ? prev.filter((a) => a !== action) : [...prev, action]));
    };

    const toggleSelectAll = () => {
        if (selectedActions.length === actions.length) {
            setSelectedActions([]);
            setSelectAll(false);
        } else {
            setSelectedActions([...actions]);
            setSelectAll(true);
        }
    };

    const fullPermissions = useMemo(() => {
        return selectedActions.map((act) => `${data.name.trim()} ${act}`);
    }, [data.name, selectedActions]);
    useEffect(() => {
        setData('permissions', fullPermissions);
    }, [fullPermissions, setData]);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!data.name.trim()) {
            toast.error('Nama permission tidak boleh kosong');
            return;
        }

        if (selectedActions.length === 0) {
            toast.error('Minimal 1 aksi harus dipilih');
            return;
        }

        post(route('permission.store'), {
            onSuccess: () => {
                toast.success('Suksess', { description: 'Permissions berhasil ditambahkan!' });
                reset();
                setSelectedActions([]);
                setSelectAll(false);
            },
            onError: (errors) => console.log(errors),
            preserveScroll: true,
        });
    };

    return (
        <AppLayout title="Tambah Permission">
            <Head title="Tambah Permission" />
            <Card>
                <CardHeader>
                    <CardTitle>Tambah Permission</CardTitle>
                    <CardDescription>
                        Tambahkan permission berdasarkan prefix + aksi (misal: <b>User index</b>, <b>User create</b>, dst).
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="grid gap-6" id="permissionForm">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nama Permission (prefix)</Label>
                                <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Contoh: User" />
                                {zodError.name && <p className="text-xs text-red-500">{zodError.name}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="guard_name">Guard Name</Label>
                                <Input id="guard_name" value={data.guard_name} onChange={(e) => setData('guard_name', e.target.value)} />
                                {zodError.guard_name && <p className="text-xs text-red-500">{zodError.guard_name}</p>}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <Label>Aksi yang Diizinkan</Label>
                                <Button type="button" variant="outline" size="sm" onClick={toggleSelectAll}>
                                    {selectedActions.length === actions.length ? 'Hapus Semua' : 'Pilih Semua'}
                                </Button>
                            </div>
                            <div className="mt-2 grid grid-cols-3 gap-2">
                                {actions.map((action) => (
                                    <label key={action} className="flex items-center gap-2 capitalize">
                                        <Checkbox checked={selectedActions.includes(action)} onCheckedChange={() => toggleAction(action)} />
                                        {action}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {fullPermissions.length > 0 && (
                            <div className="bg-muted/50 rounded-md border p-4">
                                <h4 className="mb-2 text-sm font-medium">Preview Permissions:</h4>
                                <ul className="list-inside list-disc text-sm">
                                    {fullPermissions.map((p) => (
                                        <li key={p}>{p}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" asChild>
                        <a href={route('permission.index')}>Kembali</a>
                    </Button>
                    <Button type="submit" form="permissionForm" disabled={processing}>
                        {processing && <LoaderIcon className="mr-2 animate-spin" />}
                        Simpan
                    </Button>
                </CardFooter>
            </Card>
        </AppLayout>
    );
}
