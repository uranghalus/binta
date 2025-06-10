import { useDialog } from '@/context/dialog-context';
import { Karyawan } from '../data/karyawanSchema';

import { Department } from '../../departments/data/departmentSchema';
import KaryawanActionDialog from './karyawan-action-dialogs';
import KaryawanDeleteDialog from './karyawan-delete-dialogs';

interface Props {
    departments: Department[];
}

export default function KaryawanDialogs({ departments }: Props) {
    const { open, setOpen, currentRow } = useDialog();

    return (
        <>
            {/* Dialog untuk menambah karyawan */}
            <KaryawanActionDialog key={'karyawan-add'} open={open === 'add'} onOpenChange={() => setOpen('add')} departments={departments} />

            {/* Dialog untuk mengedit karyawan */}
            {currentRow && (
                <KaryawanActionDialog
                    key={`karyawan-edit-${currentRow.id}`}
                    open={open === 'edit'}
                    onOpenChange={() => setOpen('edit')}
                    currentRow={currentRow as Karyawan}
                    departments={departments}
                />
            )}

            {/* Dialog untuk menghapus karyawan */}
            {currentRow && (
                <KaryawanDeleteDialog
                    key={`karyawan-delete-${currentRow.id}`}
                    open={open === 'delete'}
                    onOpenChange={() => setOpen('delete')}
                    currentRow={currentRow as Karyawan}
                />
            )}
        </>
    );
}
