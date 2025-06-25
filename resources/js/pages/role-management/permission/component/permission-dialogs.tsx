import { useDialog } from '@/context/dialog-context';
import { PermissionSchema } from '../data/permissionSchema';
import PermissionDeleteAction from './permission-delete-action';

export default function PermissionDialogs() {
    const { open, setOpen, currentRow } = useDialog<PermissionSchema>();
    return (
        <>
            {currentRow && (
                <PermissionDeleteAction
                    key={`permission-delete-${currentRow?.id}`}
                    open={open === 'delete'}
                    onOpenChange={() => setOpen('delete')}
                    currentRow={currentRow as PermissionSchema}
                />
            )}
        </>
    );
}
