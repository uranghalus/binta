import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';
import { SecurityData } from './data/SecurityData';

export default function ImportSecurity() {
    const [items, setItems] = useState<SecurityData[]>([]);
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
            const data: SecurityData[] = XLSX.utils.sheet_to_json(ws, { header: 0 });

            const newErrors = data.reduce((acc: number[], item, index) => {
                if (!item.kode_cekpoint || !item.lokasi || !item.lantai || !item.area) {
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
            formData.append(`cpdata[${index}][kode_cekpoint]`, item.kode_cekpoint);
            formData.append(`cpdata[${index}][lokasi]`, item.lokasi);
            formData.append(`cpdata[${index}][lantai]`, item.lantai);
            formData.append(`cpdata[${index}][area]`, item.area);
        });

        router.post(route('cekpoint-security.import'), formData, {
            preserveScroll: true,
            onStart: () => {
                toast.loading('Mengimpor data cekpoint security...');
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
        <AppLayout title="Upload Cekpoint Security Data">
            <Head title="Upload Cekpoint Security Data" />
            <Card>
                <CardHeader>
                    <CardTitle>Upload Excel Cekpoint Security</CardTitle>
                </CardHeader>
                <CardContent>
                    <Input type="file" accept=".xlsx,.xls" onChange={handleFile} />
                    {items.length > 0 && (
                        <div className="mt-4 max-h-[500px] overflow-auto rounded border p-2">
                            <table className="mt-4 min-w-full border">
                                <thead>
                                    <tr className="bg-gray-100 text-left">
                                        <th className="border p-2">#</th>
                                        <th className="border p-2">Kode Cekpoint</th>
                                        <th className="border p-2">Lokasi</th>
                                        <th className="border p-2">Lantai</th>
                                        <th className="border p-2">Area</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item, idx) => {
                                        const invalid = errors.includes(idx);
                                        return (
                                            <tr key={idx} className={invalid ? 'bg-red-100' : ''}>
                                                <td className="border p-2">{idx + 1}</td>
                                                <td className="border p-2">{item.kode_cekpoint}</td>
                                                <td className="border p-2">{item.lokasi}</td>
                                                <td className="border p-2">{item.lantai}</td>
                                                <td className="border p-2">{item.area}</td>
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
