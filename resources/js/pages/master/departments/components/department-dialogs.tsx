import { useDialog } from '@/context/dialog-context';
import { Department } from '../data/departmentSchema';

import DepartmentActionDialog from './department-action-dialogs';
import DepartmentDeleteDialog from './department-delete-dialogs';

interface Props {
    offices: { id: number; office_code: string; name: string }[];
}

export default function DepartmentDialogs({ offices }: Props) {
    const { open, setOpen, currentRow } = useDialog();

    return (
        <>
            {/* Dialog untuk menambah departemen */}
            <DepartmentActionDialog key={'department-add'} open={open === 'add'} onOpenChange={() => setOpen('add')} offices={offices} />

            {/* Dialog untuk mengedit departemen */}
            {currentRow && (
                <DepartmentActionDialog
                    key={`department-edit-${currentRow.id}`}
                    open={open === 'edit'}
                    onOpenChange={() => setOpen('edit')}
                    currentRow={currentRow as Department}
                    offices={offices}
                />
            )}

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
