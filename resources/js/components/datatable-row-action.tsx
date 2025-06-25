import { useDialog } from '@/context/dialog-context';
import { Link } from '@inertiajs/react';
import { Row } from '@tanstack/react-table';
import { Ellipsis, SquarePen, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface RowActionProps<T> {
    row: Row<T>;
    editRoute: (id: number | string) => string; // fungsi pembuat route
    resourceName?: string; // untuk label di UI
    onDelete?: () => void; // bisa override fungsi delete
}

export function RowAction<T>({ row, editRoute, resourceName = 'Item', onDelete }: RowActionProps<T>) {
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
                <DropdownMenuItem asChild>
                    <Link href={editRoute((row.original as any).id)} className="space-x-2">
                        Edit
                        <DropdownMenuShortcut>
                            <SquarePen size={16} />
                        </DropdownMenuShortcut>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => {
                        if (onDelete) {
                            onDelete();
                        } else {
                            setCurrentRow(row.original);
                            setOpen('delete');
                        }
                    }}
                    className="text-red-500!"
                >
                    Delete {resourceName}
                    <DropdownMenuShortcut>
                        <Trash2 size={16} />
                    </DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
