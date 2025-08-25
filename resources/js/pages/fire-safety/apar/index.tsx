import { Button } from '@/components/ui/button';
import { DialogProvider } from '@/context/dialog-context';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Plus, Upload } from 'lucide-react';
import { AparColumn } from './components/apar-columns';
import AparDialog from './components/apar-dialogs';
import AparTable from './components/apar-table';
import { Apar } from './data/aparSchema';
import HasAnyPermission from '@/lib/permission';

interface Props {
    apar: Apar[];
}
export default function index({ apar }: Props) {
    return (
        <AppLayout title="Apar">
            <Head title="Apar" />
            <DialogProvider>
                <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Data APAR</h2>
                        <p className="text-muted-foreground">Pengelolaan data APAR</p>
                    </div>
                    {/* <CrudPrimaryButton title="Tambah Apar" /> */}
                    {HasAnyPermission(['apar create']) && (
                        <div className="flex items-center gap-4">
                            <Button asChild variant={'outline'}>
                                <Link href={route('apar.upload')} className="space-x-1">
                                    <span>Import Apar</span>
                                    <Upload className="size-4" />
                                </Link>
                            </Button>
                            <Button asChild>
                                <Link href={route('apar.create')} className="space-x-1">
                                    <span>Tambah Apar</span>
                                    <Plus className="size-4" />
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>
                <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <AparTable columns={AparColumn} data={apar} />
                </div>
                {/* Content for APAR management will go here */}
                <AparDialog />
            </DialogProvider>
        </AppLayout>
    );
}
