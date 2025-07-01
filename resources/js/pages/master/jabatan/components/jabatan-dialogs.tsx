import { useDialog } from '@/context/dialog-context';
import { Jabatan } from '../data/jabatanSchema';
import JabatanDeleteDialog from './jabatan-delete-dialogs';

export default function JabatanDialog() {
    const { open, setOpen, currentRow } = useDialog<Jabatan>();
    return (
        <>
            {currentRow && (
                <JabatanDeleteDialog
                    key={`jabatan-delete-${currentRow.id}`}
                    open={open === 'delete'}
                    onOpenChange={() => setOpen('delete')}
                    currentRow={currentRow}
                />
            )}
        </>
    );
}
