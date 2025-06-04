import { DialogProvider } from '@/context/dialog-context';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

import RoleDialogs from './components/role-dialogs';
import RolePrimaryButton from './components/role-primary-button';
import { RolesColumn } from './components/roles-column';
import RolesTable from './components/roles-table';
import { Role } from './data/rolescheme';

export default function index({ roles }: { roles: Role[] }) {
    return (
        <AppLayout title="Master Roles">
            <Head title="Master Roles" />
            <DialogProvider>
                <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Data Role Pengguna</h2>
                        <p className="text-muted-foreground">Pengelolaan Hak Akses Pengguna</p>
                    </div>
                    <RolePrimaryButton />
                </div>
                <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <RolesTable columns={RolesColumn} data={roles} />
                </div>
                <RoleDialogs />
            </DialogProvider>
        </AppLayout>
    );
}
