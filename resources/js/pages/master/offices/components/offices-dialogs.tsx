import { useDialog } from '@/context/dialog-context';
import { OfficeActionDialog } from './office-action-dialog';
import OfficeDeleteDialog from './office-delete-dialogs';

export default function OfficesDialogs() {
    const { open, setOpen, currentRow, setCurrentRow } = useDialog();
    return (
        <>
            <OfficeActionDialog key="offices-add" open={open === 'add'} onOpenChange={() => setOpen('add')} />
            {currentRow && (
                <>
                    <OfficeActionDialog
                        key={`offices-edit-${currentRow.id}`}
                        open={open === 'edit'}
                        onOpenChange={() => {
                            setOpen('edit');
                            setTimeout(() => {
                                setCurrentRow(null);
                            }, 500);
                        }}
                        currentRow={currentRow}
                    />
                    <OfficeDeleteDialog
                        key={`offices-delete-${currentRow.id}`}
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
