import { Button } from '@/components/ui/button';
import { DialogProvider } from '@/context/dialog-context';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Plus, ScanQrCode } from 'lucide-react';

import { HydrantInspectionColumn } from './components/hydrant-inspection-column';
import HydrantInspectionDialog from './components/hydrant-inspection-dialog';
import HydrantInspectionTable from './components/hydrant-inspection-table';
import { HydrantInspectionsc } from './data/HydrantInspectionsc';

interface Props {
    inspections: HydrantInspectionsc[];
}

export default function Index({ inspections }: Props) {
    return (
        <AppLayout title="Inspeksi Hydrant">
            <Head title="Inspeksi Hydrant" />
            <DialogProvider>
                <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Data Inspeksi Hydrant</h2>
                        <p className="text-muted-foreground">Pengelolaan Data Inspeksi Hydrant</p>
                    </div>
                    <div className="space-x-4">
                        <Button asChild variant={'outline'}>
                            <Link href={route('apar.scan')} className="space-x-1">
                                <span>Scan Qr</span>
                                <ScanQrCode className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href={route('inspection.hydrant.create')} className="space-x-1">
                                <span>Tambah Data</span>
                                <Plus className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <HydrantInspectionTable data={inspections} columns={HydrantInspectionColumn} />
                </div>
                <HydrantInspectionDialog />
            </DialogProvider>
        </AppLayout>
    );
}
