import { DialogProvider } from '@/context/dialog-context';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { RoleColumn } from './components/role-column';
import RoleTable from './components/role-table';
import { Role } from './data/scheme';

interface Props {
    roles: Role[];
}

const RoleIndex: React.FC<Props> = ({ roles }) => {
    return (
        <AppLayout title="Master Roles">
            <Head title="Master Role" />
            <DialogProvider>
                <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Data Role Pengguna</h2>
                        <p className="text-muted-foreground">Pengelolaan data role pengguna</p>
                    </div>
                    {/* <OfficePrimaryButton /> */}
                </div>
                <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <RoleTable data={roles} columns={RoleColumn} />
                </div>
            </DialogProvider>
        </AppLayout>
    );
};

export default RoleIndex;
