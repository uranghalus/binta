import { useDialog } from '@/context/dialog-context';
import { User } from '@/types';
import UserDeleteDialog from './user-delete-dialogs';

export default function UserDialog() {
    const { open, setOpen, currentRow } = useDialog<User>();
    return (
        <>
            {currentRow && (
                <UserDeleteDialog
                    key={`user-delete-${currentRow.id}`}
                    open={open === 'delete'}
                    onOpenChange={() => setOpen('delete')}
                    currentRow={currentRow}
                />
            )}
        </>
    );
}
