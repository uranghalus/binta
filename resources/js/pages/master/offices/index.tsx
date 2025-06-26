import { Button } from '@/components/ui/button';
import { DialogProvider } from '@/context/dialog-context';
import AppLayout from '@/layouts/app-layout';
import HasAnyPermission from '@/lib/permission';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { officeColumn } from './components/office-columns';
import OfficesDialogs from './components/offices-dialogs';
import { OfficesTable } from './components/offices-table';
import { Office } from './data/scheme';

export default function index({ offices }: { offices: Office[] }) {
    return (
        <AppLayout title="Master Unit Bisnis">
            <Head title="Master Unit Bisnis" />
            <DialogProvider>
                <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Data Unit Bisnis</h2>
                        <p className="text-muted-foreground">Pengelolaan data unit bisnis</p>
                    </div>
                    {HasAnyPermission(['unit bisnis create']) && (
                        <Button asChild>
                            <Link href={route('unit-bisnis.create')} className="space-x-1">
                                Tambah Unit Bisnis
                                <Plus className="size-4" />
                            </Link>
                        </Button>
                    )}
                </div>
                <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <OfficesTable data={offices} columns={officeColumn} />
                </div>
                <OfficesDialogs />
            </DialogProvider>
        </AppLayout>
    );
}
