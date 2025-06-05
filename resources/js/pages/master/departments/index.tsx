import { DialogProvider } from '@/context/dialog-context';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Office } from '../offices/data/scheme';
import { DepartmentsColumn } from './components/department-column';
import DepartmentDialogs from './components/department-dialogs';
import DepartmentPrimaryButton from './components/department-primary-button';
import DepartmentTable from './components/department-table';
import { Department } from './data/departmentSchema';

interface Props {
    departments: Department[];
    offices: Office[];
}
export default function DepartmentIndex({ departments, offices }: Props) {
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
                    <DepartmentTable columns={DepartmentsColumn} data={departments} />
                </div>
                <DepartmentDialogs offices={offices} />
            </DialogProvider>
        </AppLayout>
    );
}
