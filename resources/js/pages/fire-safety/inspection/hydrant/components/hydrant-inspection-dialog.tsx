import { useDialog } from '@/context/dialog-context';
import { HydrantInspectionsc } from '../data/HydrantInspectionsc';
import HydrantDeleteDialog from './hydrant-inspection-delete-action';

export default function HydrantInspectionDialog() {
    const { open, setOpen, currentRow } = useDialog<HydrantInspectionsc>();
    return (
        <>
            {/* <HydrantInspectionActionDialog key={'hydrant-inspection-add'} open={open === 'add'} onOpenChange={() => setOpen('add')} />
            {currentRow && (
                <HydrantInspectionActionDialog
                    key={`hydrant-inspection-edit-${currentRow.id}`}
                    open={open === 'edit'}
                    onOpenChange={() => setOpen('edit')}
                    currentRow={currentRow}
                />
            )} */}
            {currentRow && (
                <HydrantDeleteDialog
                    key={`hydrant-inspection-delete-${currentRow.id}`}
                    open={open === 'delete'}
                    onOpenChange={() => setOpen('delete')}
                    currentRow={currentRow as HydrantInspectionsc}
                />
            )}
        </>
    );
}
