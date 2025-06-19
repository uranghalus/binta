import { useDialog } from '@/context/dialog-context';

// import InspectionAparActionDialog from './inspection-apar-action-dialogs';
import { AparInspection } from '../data/inspectionAparSchema';
import InspectionAparDeleteDialog from './inspection-apar-delete-dialog';

export default function InspectionAparDialogs() {
    const { open, setOpen, currentRow } = useDialog<AparInspection>();
    return (
        <>
            {/* <InspectionAparActionDialog key={'inspection-apar-add'} open={open === 'add'} onOpenChange={() => setOpen('add')} />
            {currentRow && (
                <InspectionAparActionDialog
                    key={`inspection-apar-edit-${currentRow.id}`}
                    open={open === 'edit'}
                    onOpenChange={() => setOpen('edit')}
                    currentRow={currentRow}
                />
            )} */}
            {currentRow && (
                <InspectionAparDeleteDialog
                    key={`inspection-apar-delete-${currentRow.id}`}
                    open={open === 'delete'}
                    onOpenChange={() => setOpen('delete')}
                    currentRow={currentRow as AparInspection}
                />
            )}
        </>
    );
}
