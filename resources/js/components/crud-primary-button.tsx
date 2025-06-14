import { useDialog } from '@/context/dialog-context';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';

export interface Props {
    title: string;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
    size?: 'default' | 'sm' | 'lg';
    className?: string;
}
export default function CrudPrimaryButton({ title, variant = 'default', size = 'default', className }: Props) {
    const { setOpen } = useDialog();
    return (
        <Button className={cn('space-x-1', className)} variant={variant} size={size} onClick={() => setOpen('add')}>
            <span>{title}</span>
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add</span>
        </Button>
    );
}
