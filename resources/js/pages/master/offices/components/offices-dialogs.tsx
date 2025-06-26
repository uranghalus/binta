import { useDialog } from '@/context/dialog-context';
import { Office } from '../data/scheme';
import OfficeDeleteDialog from './office-delete-dialogs';

export default function OfficesDialogs() {
    const { open, setOpen, currentRow, setCurrentRow } = useDialog<Office>();
    return (
        <>
            {currentRow && (
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
            )}
        </>
    );
}
