import { Button } from '@/components/ui/button';
import { DialogProvider } from '@/context/dialog-context';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { SecurityData } from './data/SecurityData';

interface Props {
    cekPointSecurityData: SecurityData[];
}
export default function Index({ cekPointSecurityData }: Props) {
    return (
        <AppLayout title="Data Cekpoint Security">
            <Head title="Data Cekpoint Security" />
            <DialogProvider>
                <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Data Inspeksi Hydrant</h2>
                        <p className="text-muted-foreground">Pengelolaan Data Inspeksi Hydrant</p>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* <Button asChild variant={'outline'}>
                            <Link href={route('cekpoin-security.upload')} className="space-x-1">
                                <span>Import Cek Point</span>
                                <Upload className="size-4" />
                            </Link>
                        </Button> */}
                        <Button asChild>
                            <Link href={route('cekpoin-security.create')} className="space-x-1">
                                <span>Tambah Cekpoin</span>
                                <Plus className="size-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </DialogProvider>
        </AppLayout>
    );
}
