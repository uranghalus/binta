import { useDialog } from '@/context/dialog-context';
import { Apar } from '../data/aparSchema';
import AparDeleteDialog from './apar-delete-action';

export default function AparDialog() {
    const { open, setOpen, currentRow } = useDialog<Apar>();
    return (
        <>
            {currentRow && (
                <AparDeleteDialog
                    key={`role-delete-${currentRow.id}`}
                    open={open === 'delete'}
                    onOpenChange={() => setOpen('delete')}
                    currentRow={currentRow as Apar}
                />
            )}
        </>
    );
}
