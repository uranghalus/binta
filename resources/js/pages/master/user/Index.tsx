import { Button } from '@/components/ui/button';
import { DialogProvider } from '@/context/dialog-context';
import AppLayout from '@/layouts/app-layout';
import HasAnyPermission from '@/lib/permission';
import { User } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { UserColumn } from './components/user-column';
import UserDialog from './components/user-dialogs';
import UserTable from './components/user-table';

interface Props {
    user: User[];
}
export default function Index({ user }: Props) {
    return (
        <AppLayout title="Master Pengguna">
            <Head title="Master Pengguna" />
            <DialogProvider>
                <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Data Jabatan</h2>
                        <p className="text-muted-foreground">Pengelolaan Data Jabatan</p>
                    </div>
                    {HasAnyPermission(['users create']) && (
                        <Button asChild>
                            <Link href={route('pengguna.create')} className="space-x-1">
                                Tambah Jabatan
                                <Plus className="size-4" />
                            </Link>
                        </Button>
                    )}
                </div>
                <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <UserTable columns={UserColumn} data={user} />
                </div>
                <UserDialog />
            </DialogProvider>
        </AppLayout>
    );
}
