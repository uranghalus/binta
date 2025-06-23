import { useDialog } from '@/context/dialog-context';
import { Hydrant } from '../data/hydrantSchema';
import HydrantActionDialog from './hydrant-action-dialogs';
import HydrantDeleteDialog from './hydreant-delete-dialogs';

export default function HydrantDialogs() {
    const { open, setOpen, currentRow } = useDialog<Hydrant>();
    return (
        <>
            <HydrantActionDialog key={'hydrant-add'} open={open === 'add'} onOpenChange={() => setOpen('add')} />
            {currentRow && (
                <HydrantActionDialog
                    key={`hydrant-edit-${currentRow.id}`}
                    open={open === 'edit'}
                    onOpenChange={() => setOpen('edit')}
                    currentRow={currentRow}
                />
            )}
            {currentRow && (
                <HydrantDeleteDialog
                    key={`hydrant-delete-${currentRow.id}`}
                    open={open === 'delete'}
                    onOpenChange={() => setOpen('delete')}
                    currentRow={currentRow as Hydrant}
                />
            )}
        </>
    );
}
