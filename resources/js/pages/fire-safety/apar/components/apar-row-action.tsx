import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDialog } from '@/context/dialog-context';
import { Row } from '@tanstack/react-table';
import { Ellipsis, SquarePen, Trash2 } from 'lucide-react';
import { Apar } from '../data/aparSchema';

interface Props {
    row: Row<Apar>;
}
export default function AparRowAction({ row }: Props) {
    const { setOpen, setCurrentRow } = useDialog();
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="data-[state=open]:bg-muted flex h-8 w-8 p-0">
                    <Ellipsis className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem
                    onClick={() => {
                        setCurrentRow(row.original);
                        setOpen('edit');
                    }}
                >
                    Edit
                    <DropdownMenuShortcut>
                        <SquarePen size={16} />
                    </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => {
                        setCurrentRow(row.original);
                        setOpen('delete');
                    }}
                    className="text-red-500!"
                >
                    Delete
                    <DropdownMenuShortcut>
                        <Trash2 size={16} />
                    </DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
