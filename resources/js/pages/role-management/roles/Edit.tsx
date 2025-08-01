import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

interface PermissionMap {
    [group: string]: string[];
}

interface Role {
    id: number;
    name: string;
    permissions: { id: number; name: string }[];
}

interface Props {
    role: Role;
    permissions: PermissionMap;
}

export default function Edit({ role, permissions }: Props) {
    const { data, setData, put, errors, processing } = useForm<{
        name: string;
        selectedPermissions: string[];
    }>({
        name: role.name,
        selectedPermissions: role.permissions.map((p) => p.name),
    });

    const handlePermissionToggle = (permission: string, checked: boolean) => {
        const items = [...data.selectedPermissions];

        if (checked) {
            if (!items.includes(permission)) items.push(permission);
        } else {
            const index = items.indexOf(permission);
            if (index !== -1) items.splice(index, 1);
        }

        setData('selectedPermissions', items);
    };

    const handleUpdateData = (e: FormEvent) => {
        e.preventDefault();

        put(route('role.update', role.id), {
            onSuccess: () => {
                // bisa tambahkan notifikasi di sini
            },
        });
    };

    return (
        <AppLayout title="Edit Hak Akses">
            <Head title="Edit Hak Akses" />
            <Card>
                <CardHeader>
                    <CardTitle>Form Edit Role</CardTitle>
                    <CardDescription className="text-muted-foreground">Edit role dan hak akses yang sesuai</CardDescription>
                </CardHeader>
                <form onSubmit={handleUpdateData} className="space-y-4">
                    <CardContent>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nama Role</Label>
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Masukkan Nama Role"
                            />
                            {errors.name && <div className="text-sm text-red-500">{errors.name}</div>}
                        </div>

                        <div className="mt-6 mb-4">
                            <div className="grid grid-cols-2 gap-4">
                                {Object.entries(permissions).map(([group, permissionItems], i) => (
                                    <div key={i} className="rounded-lg bg-white p-4 shadow-md">
                                        <h3 className="mb-2 text-lg font-bold">{group}</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {permissionItems.map((permission) => (
                                                <label key={permission} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        checked={data.selectedPermissions.includes(permission)}
                                                        onCheckedChange={(checked) => handlePermissionToggle(permission, Boolean(checked))}
                                                    />
                                                    <span className="text-sm">{permission}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {errors?.selectedPermissions && <div className="mt-2 text-sm text-red-500">{errors.selectedPermissions}</div>}
                        </div>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between">
                        <Button variant="outline" asChild>
                            <Link href={route('role.index')}>Kembali</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            Simpan
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </AppLayout>
    );
}
