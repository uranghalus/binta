import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';
import { Apar } from './data/aparSchema';

export default function UploadExcel() {
    const [items, setItems] = useState<Apar[]>([]);
    const [errors, setErrors] = useState<number[]>([]);
    const { processing } = useForm<any>({
        data: [],
    });

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
            const arrayBuffer = evt.target?.result as ArrayBuffer;
            const wb = XLSX.read(arrayBuffer, { type: 'array' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data: Apar[] = XLSX.utils.sheet_to_json(ws, { header: 0 });

            const newErrors = data.reduce((acc: number[], item, index) => {
                if (!item.kode_apar || !item.lokasi || !item.jenis || !item.size) {
                    acc.push(index);
                }
                return acc;
            }, []);

            setErrors(newErrors);
            setItems(data);
        };
        reader.readAsArrayBuffer(file);
    };

    const handleSubmit = () => {
        const formData = new FormData();

        items.forEach((item, index) => {
            formData.append(`data[${index}][kode_apar]`, item.kode_apar);
            formData.append(`data[${index}][lokasi]`, item.lokasi);
            formData.append(`data[${index}][jenis]`, item.jenis);
            formData.append(`data[${index}][size]`, String(item.size));
            formData.append(`data[${index}][lantai]`, item.lantai ?? '');
        });

        router.post(route('apar.import'), formData, {
            preserveScroll: true,
            onStart: () => {
                toast.loading('Mengimpor data APAR...');
            },
            onSuccess: () => {
                toast.dismiss();
                toast.success('Import berhasil!');
            },
            onError: (errors) => {
                toast.dismiss();
                toast.error('Gagal mengimpor data. Periksa kembali isian!');
                console.error(errors);
            },
        });
    };

    return (
        <AppLayout title="Upload APAR Data">
            <Head title="Upload APAR Data" />
            <Card>
                <CardHeader>
                    <CardTitle>Upload Excel APAR</CardTitle>
                </CardHeader>
                <CardContent>
                    <Input type="file" accept=".xlsx,.xls" onChange={handleFile} />
                    {items.length > 0 && (
                        <div className="mt-4 max-h-[500px] overflow-auto rounded border p-2">
                            <table className="mt-4 min-w-full border">
                                <thead>
                                    <tr className="bg-gray-100 text-left">
                                        <th className="border p-2">#</th>
                                        <th className="border p-2">Kode APAR</th>
                                        <th className="border p-2">Lokasi</th>
                                        <th className="border p-2">Jenis</th>
                                        <th className="border p-2">Size</th>
                                        <th className="border p-2">Lantai</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item, idx) => {
                                        const invalid = errors.includes(idx);
                                        return (
                                            <tr key={idx} className={invalid ? 'bg-red-100' : ''}>
                                                <td className="border p-2">{idx + 1}</td>
                                                <td className="border p-2">{item.kode_apar}</td>
                                                <td className="border p-2">{item.lokasi}</td>
                                                <td className="border p-2">{item.jenis}</td>
                                                <td className="border p-2">{item.size}</td>
                                                <td className="border p-2">{item.lantai}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="space-x-2">
                    <Button onClick={handleSubmit} disabled={processing || errors.length > 0}>
                        Simpan ke Database
                    </Button>
                </CardFooter>
            </Card>
        </AppLayout>
    );
}
