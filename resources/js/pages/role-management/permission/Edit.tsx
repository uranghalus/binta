import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { LoaderIcon } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';
import { PermissionSchema } from './data/permissionSchema';

interface Props {
    permission: PermissionSchema;
}

export default function Edit({ permission }: Props) {
    const { put, processing, data, setData } = useForm({
        name: permission.name || '',
        guard_name: permission.guard_name || 'web',
    });

    const [zodError, setZodError] = useState<Record<string, string>>({});

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(route('permission.update', permission.id), {
            onSuccess: () => {
                toast.success('Data berhasil diupdate!', { description: 'Permission berhasil diupdate.' });
            },
            onError: (errors) => {
                setZodError(errors);
            },
            preserveScroll: true,
        });
    };

    return (
        <AppLayout title="Edit Permission">
            <Head title="Edit Permission" />
            <Card>
                <CardHeader>
                    <CardTitle>Edit Permission</CardTitle>
                    <CardDescription className="text-muted-foreground">Edit Data Permission</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2" id="permissionForm">
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Nama Permission</Label>
                                <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Nama permission" />
                                {zodError.name && <p className="text-xs text-red-500">{zodError.name}</p>}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="guard_name">Guard Name</Label>
                                <Input
                                    id="guard_name"
                                    value={data.guard_name}
                                    onChange={(e) => setData('guard_name', e.target.value)}
                                    placeholder="Guard name"
                                />
                                {zodError.guard_name && <p className="text-xs text-red-500">{zodError.guard_name}</p>}
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <Button variant={'outline'} asChild>
                        <a href={route('permission.index')}>Kembali</a>
                    </Button>
                    <Button type="submit" form="permissionForm" disabled={processing}>
                        {processing && <LoaderIcon className="animate-spin" />}
                        Simpan
                    </Button>
                </CardFooter>
            </Card>
        </AppLayout>
    );
}
