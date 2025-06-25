import { useDialog } from '@/context/dialog-context';
import { IRole } from '../data/rolescheme';

import RoleDeleteDialog from './role-delete-dialog';

export default function RoleDialogs() {
    const { open, setOpen, currentRow } = useDialog<IRole>();
    return (
        <>
            {currentRow && (
                <RoleDeleteDialog
                    key={`role-delete-${currentRow.id}`}
                    open={open === 'delete'}
                    onOpenChange={() => setOpen('delete')}
                    currentRow={currentRow}
                />
            )}
        </>
    );
}
