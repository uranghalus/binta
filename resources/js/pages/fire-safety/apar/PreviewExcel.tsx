import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { useForm } from '@inertiajs/react';

type Item = {
    no: number;
    kode_apar: string;
    lokasi: string;
    jenis: string;
    size: number;
    errors: string[];
};

interface Props {
    items?: Item[]; // optional
}
export default function PreviewExcel({ items = [] }: Props) {
    const { post, processing } = useForm({ items });

    const handleImport = () => {
        post(route('apar.import'));
    };

    return (
        <AppLayout title="Preview APAR">
            <Card className="mx-auto mt-10 max-w-5xl">
                <CardHeader>
                    <CardTitle>Preview Data APAR</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="max-h-[400px] overflow-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>No</TableHead>
                                    <TableHead>Kode</TableHead>
                                    <TableHead>Lokasi</TableHead>
                                    <TableHead>Jenis</TableHead>
                                    <TableHead>Size</TableHead>
                                    <TableHead>Error</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {items.map((item, i) => (
                                    <TableRow key={i} className={item.errors.length > 0 ? 'bg-red-100' : ''}>
                                        <TableCell>{item.no}</TableCell>
                                        <TableCell>{item.kode_apar}</TableCell>
                                        <TableCell>{item.lokasi}</TableCell>
                                        <TableCell>{item.jenis}</TableCell>
                                        <TableCell>{item.size}</TableCell>
                                        <TableCell className="text-sm text-red-500">
                                            {item.errors.length > 0 ? item.errors.join(', ') : '-'}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <Button className="mt-4" onClick={handleImport} disabled={processing}>
                        {processing ? 'Mengimpor...' : 'Impor Data Valid'}
                    </Button>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
