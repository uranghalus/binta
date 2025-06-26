import { useDialog } from '@/context/dialog-context';
import { Department } from '../data/departmentSchema';

import DepartmentDeleteDialog from './department-delete-dialogs';

export default function DepartmentDialogs() {
    const { open, setOpen, currentRow } = useDialog<Department>();

    return (
        <>
            {/* Dialog untuk menghapus departemen */}
            {currentRow && (
                <DepartmentDeleteDialog
                    key={`department-delete-${currentRow.id}`}
                    open={open === 'delete'}
                    onOpenChange={() => setOpen('delete')}
                    currentRow={currentRow as Department}
                />
            )}
        </>
    );
}
