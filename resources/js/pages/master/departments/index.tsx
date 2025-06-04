import { DialogProvider } from '@/context/dialog-context';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { DepartmentsColumn } from './components/department-column';
import DepartmentPrimaryButton from './components/department-primary-button';
import DepartmentsTable from './components/department-table';
import { DepartmentInter } from './data/departmentSchema';

export default function DepartmentIndex({ departments }: { departments: DepartmentInter[] }) {
    return (
        <AppLayout title="Master Departments">
            <Head title="Master Departments" />
            <DialogProvider>
                <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Data Departments</h2>
                        <p className="text-muted-foreground">Pengelolaan Data Departemen</p>
                    </div>
                    <DepartmentPrimaryButton />
                </div>
                <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <DepartmentsTable columns={DepartmentsColumn} data={departments} />
                </div>
                {/* <DepartmentDialogs /> */}
            </DialogProvider>
        </AppLayout>
    );
}
