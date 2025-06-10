import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Department } from '../departments/data/departmentSchema';

interface Props {
    departments: Department[];
}
export default function create({ departments }: Props) {
    return (
        <AppLayout title="Master Karyawan">
            <Head title="Master Karyawan" />

            <Card>
                <CardHeader>
                    <CardTitle>Tambah Karyawan</CardTitle>
                    <CardDescription className="text-muted-foreground">Tambah Data Karyawan</CardDescription>
                </CardHeader>
                <CardContent>Peler</CardContent>
            </Card>
        </AppLayout>
    );
}
