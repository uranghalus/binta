import { Button } from '@/components/ui/button';
import { DialogProvider } from '@/context/dialog-context';
import AppLayout from '@/layouts/app-layout';
import HasAnyPermission from '@/lib/permission';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import PermissionDialogs from './component/permission-dialogs';
import PermissionTable from './component/permission-table';
import { PermissionColumn } from './component/permissions-column';
import { PermissionSchema } from './data/permissionSchema';

interface Props {
    // Define any props if needed
    permissions: PermissionSchema[];
}

export default function index({ permissions }: Props) {
    return (
        <AppLayout title="Manajemen Hak Akses">
            <Head title="Manajemen Hak Akses" />
            {/* Add your content here */}
            <DialogProvider>
                <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Data Role Pengguna</h2>
                        <p className="text-muted-foreground">Pengelolaan Hak Akses Pengguna</p>
                    </div>
                    {HasAnyPermission(['permissions create']) && (
                        <Button asChild>
                            <Link href={route('permission.create')} className="space-x-1">
                                Tambah Permission
                                <Plus className="size-4" />
                            </Link>
                        </Button>
                    )}
                </div>
                <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <PermissionTable columns={PermissionColumn} data={permissions} />
                </div>
                <PermissionDialogs />
            </DialogProvider>
        </AppLayout>
    );
}
