import { Button } from '@/components/ui/button';
import { DialogProvider } from '@/context/dialog-context';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Plus, ScanQrCode } from 'lucide-react';
import { InspectionAparColumns } from './components/inspection-apar-column';
import InspectionAparDialogs from './components/inspection-apar-dialogs';
import InspectionAparTable from './components/inspection-apar-table';
import { AparInspection } from './data/inspectionAparSchema';

interface Props {
    aparInspections: AparInspection[]; // Replace 'any' with the actual type of aparInspections
}
export default function index({ aparInspections }: Props) {
    return (
        <AppLayout title="Inspeksi Apar">
            <Head title="Inspeksi Apar" />
            <DialogProvider>
                <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Data Inspeksi Apar</h2>
                        <p className="text-muted-foreground">Pengelolaan Data Inspeksi Apar</p>
                    </div>
                    <div className="space-x-4">
                        <Button asChild variant={'outline'}>
                            <Link href={route('apar.scan')} className="space-x-1">
                                <span>Scan Qr</span>
                                <ScanQrCode className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href={route('inspection.apar.create')} className="space-x-1">
                                <span>Tambah Data</span>
                                <Plus className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <InspectionAparTable data={aparInspections} columns={InspectionAparColumns} />
                </div>
                <InspectionAparDialogs />
            </DialogProvider>
        </AppLayout>
    );
}
