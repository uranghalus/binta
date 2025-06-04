import { useDialog } from '@/context/dialog-context';
import RoleActionDialog from './role-action-dialog';
import RoleDeleteDialog from './role-delete-dialog';

export default function RoleDialogs() {
    const { open, setOpen, currentRow, setCurrentRow } = useDialog();
    return (
        <>
            <RoleActionDialog key={'role-add'} open={open === 'add'} onOpenChange={() => setOpen('add')} />
            {currentRow && (
                <RoleActionDialog
                    key={`role-edit-${currentRow.id}`}
                    open={open === 'edit'}
                    onOpenChange={() => setOpen('edit')}
                    currentRow={currentRow}
                />
            )}
            {currentRow && (
                <RoleDeleteDialog
                    key={`role-delete-${currentRow.id}`}
                    open={open === 'delete'}
                    onOpenChange={() => setOpen('delete')}
                    currentRow={currentRow}
                />
            )}
        </>
    );
}
