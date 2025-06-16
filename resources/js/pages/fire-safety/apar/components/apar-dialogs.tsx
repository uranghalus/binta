import { useDialog } from '@/context/dialog-context';
import { Apar } from '../data/aparSchema';
import AparDeleteDialog from './apar-delete-action';

import AparActionDialog from './apar-action-dialogs';

export default function AparDialog() {
    const { open, setOpen, currentRow } = useDialog<Apar>();
    return (
        <>
            <AparActionDialog key={'apar-add'} open={open === 'add'} onOpenChange={() => setOpen('add')} />
            {currentRow && (
                <AparActionDialog
                    key={`apar-edit-${currentRow.id}`}
                    open={open === 'edit'}
                    onOpenChange={() => setOpen('edit')}
                    currentRow={currentRow}
                />
            )}
            {currentRow && (
                <AparDeleteDialog
                    key={`apar-delete-${currentRow.id}`}
                    open={open === 'delete'}
                    onOpenChange={() => setOpen('delete')}
                    currentRow={currentRow as Apar}
                />
            )}
        </>
    );
}
