import { useDialog } from '@/context/dialog-context';
import { SecurityData } from '../data/SecurityData';
import CpDeleteDialog from './cp-delete-dialog';

export default function CpDialogs() {
    const { open, setOpen, currentRow } = useDialog<SecurityData>();
    return (
        <>
            {currentRow && (
                <CpDeleteDialog
                    key={`cp-dialog-${currentRow.kode_cekpoint}`}
                    open={open === 'delete'}
                    onOpenChange={() => setOpen('delete')}
                    currentRow={currentRow as SecurityData}
                />
            )}
        </>
    );
}
