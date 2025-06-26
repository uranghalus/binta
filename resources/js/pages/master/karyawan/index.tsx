import { Button } from '@/components/ui/button';
import { DialogProvider } from '@/context/dialog-context';
import AppLayout from '@/layouts/app-layout';
import HasAnyPermission from '@/lib/permission';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { Department } from '../departments/data/departmentSchema';
import { KaryawanColumn } from './components/karyawan-column';
import KaryawanDialogs from './components/karyawan-dialogs';
import KaryawanTable from './components/karyawan-table';
import { Karyawan } from './data/karyawanSchema';

interface Props {
    karyawans: Karyawan[];
    departments: Department[];
}

export default function KaryawanIndex({ karyawans, departments }: Props) {
    return (
        <AppLayout title="Master Karyawan">
            <Head title="Master Karyawan" />
            <DialogProvider>
                <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Data Karyawan</h2>
                        <p className="text-muted-foreground">Pengelolaan Data Karyawan</p>
                    </div>
                    {/* <KaryawanPrimaryButton /> */}
                    {HasAnyPermission(['karyawan create']) && (
                        <Button asChild>
                            <Link href={route('karyawan.create')} className="space-x-1">
                                <span>Tambah Karyawan</span>
                                <Plus className="h-4 w-4" />
                            </Link>
                        </Button>
                    )}
                </div>
                <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <KaryawanTable columns={KaryawanColumn} data={karyawans} departments={departments} />
                </div>
                <KaryawanDialogs departments={departments} />
            </DialogProvider>
        </AppLayout>
    );
}
