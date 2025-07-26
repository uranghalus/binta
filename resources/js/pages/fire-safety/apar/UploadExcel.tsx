// resources/js/Pages/Apar/UploadExcel.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

export default function UploadExcel() {
    const { data, setData, post, processing, errors } = useForm({ file: null as File | null });

    const handlePreview = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('apar.preview'));
    };

    return (
        <AppLayout title="Upload APAR">
            <Head title="Upload APAR" />
            <Card>
                <CardHeader>
                    <CardTitle>Upload Excel APAR</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handlePreview} className="space-y-4">
                        <Input type="file" accept=".xlsx,.xls,.csv" onChange={(e) => setData('file', e.target.files?.[0] ?? null)} />
                        {errors.file && <p className="text-red-500">{errors.file}</p>}
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Memproses...' : 'Preview Data'}
                        </Button>
                    </form>
                    {/* <a href={route('apar.template')} className="mt-2 inline-block text-sm text-blue-500 underline">
                    Download Template Excel
                </a> */}
                </CardContent>
            </Card>
        </AppLayout>
    );
}
