import { Button } from '@/components/ui/button';
import { useDialog } from '@/context/dialog-context';
import { Plus } from 'lucide-react';

export default function KaryawanPrimaryButton() {
    const { setOpen } = useDialog();
    return (
        <Button className="space-x-1" onClick={() => setOpen('add')}>
            <span>Tambah Karyawan</span>
            <Plus className="h-4 w-4" />
        </Button>
    );
}
