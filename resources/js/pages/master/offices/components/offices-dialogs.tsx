import { useDialog } from '@/context/dialog-context';
import { OfficeActionDialog } from './office-action-dialog';

export default function OfficesDialogs() {
    const { open, setOpen, currentRow, setCurrentRow } = useDialog();
    return (
        <>
            <OfficeActionDialog key="user-add" open={open === 'add'} onOpenChange={() => setOpen('add')} />
            {currentRow && (
                <>
                    <OfficeActionDialog
                        key={`user-edit-${currentRow.id}`}
                        open={open === 'edit'}
                        onOpenChange={() => {
                            setOpen('edit');
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
