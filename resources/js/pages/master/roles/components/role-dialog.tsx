import { useDialog } from '@/context/dialog-context';
import RoleActionDialog from './rolce-action-dialog';
import RoleDeleteDialog from './role-delete-dialog';

export default function RoleDialog() {
    const { open, setOpen, currentRow, setCurrentRow } = useDialog();
    return (
        <>
            <RoleActionDialog key={'role-add'} open={open === 'add'} onOpenChange={() => setOpen('add')} />
            {currentRow && (
                <>
                    <RoleActionDialog
                        key={`role-edit-${currentRow.id}`}
                        open={open === 'edit'}
                        onOpenChange={() => {
                            setOpen('edit');
                            setTimeout(() => {
                                setCurrentRow(null);
                            }, 500);
                        }}
                        currentRow={currentRow}
                    />
                    <RoleDeleteDialog
                        key={`role-delete-${currentRow.id}`}
                        open={open === 'delete'}
                        onOpenChange={() => {
                            setOpen('delete');
                            setTimeout(() => {
                                setCurrentRow(null);
                            }, 500);
                        }}
                        currentRow={currentRow}
                    />
                </>
            )}
        </>
    );
}
