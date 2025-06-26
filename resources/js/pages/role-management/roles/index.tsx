import { DialogProvider } from '@/context/dialog-context';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import HasAnyPermission from '@/lib/permission';
import { Plus } from 'lucide-react';
import RoleDialogs from './components/role-dialogs';
import { RolesColumn } from './components/roles-column';
import RolesTable from './components/roles-table';
import { IRole } from './data/rolescheme';

export default function index({ roles }: { roles: IRole[] }) {
    return (
        <AppLayout title="Master Roles">
            <Head title="Master Roles" />
            <DialogProvider>
                <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Data Role Pengguna</h2>
                        <p className="text-muted-foreground">Pengelolaan Hak Akses Pengguna</p>
                    </div>
                    {HasAnyPermission(['roles create']) && (
                        <Button asChild>
                            <Link href={route('role.create')} className="space-x-1">
                                Tambah Role
                                <Plus className="size-4" />
                            </Link>
                        </Button>
                    )}
                </div>
                <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <RolesTable columns={RolesColumn} data={roles} />
                </div>
                <RoleDialogs />
            </DialogProvider>
        </AppLayout>
    );
}
