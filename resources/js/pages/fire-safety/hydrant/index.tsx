import CrudPrimaryButton from '@/components/crud-primary-button';
import { DialogProvider } from '@/context/dialog-context';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// import { HydrantColumn } from './components/hydrant-columns';
// import HydrantDialog from './components/hydrant-dialogs';
// import HydrantTable from './components/hydrant-table';
import HasAnyPermission from '@/lib/utils';
import { HydrantColumn } from './components/hydrant-collumn';
import HydrantDialogs from './components/hydrant-dialogs';
import HydrantTable from './components/hydrant-table';
import { Hydrant } from './data/hydrantSchema';

interface Props {
    hydrantdata: Hydrant[];
}

export default function index({ hydrantdata }: Props) {
    return (
        <AppLayout title="Hydrant Data">
            <Head title="Hydrant Data" />
            <DialogProvider>
                <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Data Hydrant</h2>
                        <p className="text-muted-foreground">Pengelolaan data Hydrant</p>
                    </div>
                    {HasAnyPermission(['permissions create']) && <CrudPrimaryButton title="Tambah Hydrant" />}
                </div>
                <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <HydrantTable columns={HydrantColumn} data={hydrantdata} />
                </div>
                <HydrantDialogs />
            </DialogProvider>
        </AppLayout>
    );
}
