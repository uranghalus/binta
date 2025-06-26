import { Button } from '@/components/ui/button';
import { DialogProvider } from '@/context/dialog-context';
import AppLayout from '@/layouts/app-layout';
import HasAnyPermission from '@/lib/permission';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { DepartmentsColumn } from './components/department-column';
import DepartmentDialogs from './components/department-dialogs';
import DepartmentTable from './components/department-table';
import { Department } from './data/departmentSchema';

interface Props {
    departments: Department[];
}
export default function DepartmentIndex({ departments }: Props) {
    return (
        <AppLayout title="Master Departments">
            <Head title="Master Departments" />
            <DialogProvider>
                <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Data Departments</h2>
                        <p className="text-muted-foreground">Pengelolaan Data Departemen</p>
                    </div>
                    {HasAnyPermission(['departemen create']) && (
                        <Button asChild>
                            <Link href={route('departemen.create')} className="space-x-1">
                                Tambah Departemen
                                <Plus className="size-4" />
                            </Link>
                        </Button>
                    )}
                </div>
                <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <DepartmentTable columns={DepartmentsColumn} data={departments} />
                </div>
                <DepartmentDialogs />
            </DialogProvider>
        </AppLayout>
    );
}
