import { Button } from '@/components/ui/button';
import { DialogProvider } from '@/context/dialog-context';
import AppLayout from '@/layouts/app-layout';
import HasAnyPermission from '@/lib/permission';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { JabatanColumn } from './components/jabatan-column';
// import JabatanDialogs from './components/jabatan-dialogs';
import { Department } from '../departments/data/departmentSchema';
import JabatanDialog from './components/jabatan-dialogs';
import JabatanTable from './components/jabatan-table';
import { Jabatan } from './data/jabatanSchema';

interface Props {
    jabatans: Jabatan[];
    departments: Department[];
}

export default function JabatanIndex({ jabatans, departments }: Props) {
    console.log('JabatanIndex jabatans:', jabatans);

    return (
        <AppLayout title="Master Jabatan">
            <Head title="Master Jabatan" />
            <DialogProvider>
                <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Data Jabatan</h2>
                        <p className="text-muted-foreground">Pengelolaan Data Jabatan</p>
                    </div>
                    {HasAnyPermission(['jabatan create']) && (
                        <Button asChild>
                            <Link href={route('jabatan.create')} className="space-x-1">
                                Tambah Jabatan
                                <Plus className="size-4" />
                            </Link>
                        </Button>
                    )}
                </div>
                <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <JabatanTable columns={JabatanColumn} data={jabatans} departments={departments} />
                </div>
                <JabatanDialog />
            </DialogProvider>
        </AppLayout>
    );
}
