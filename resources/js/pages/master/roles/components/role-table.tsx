import { ColumnDef } from '@tanstack/react-table';
import { Role } from '../data/scheme';

interface RoleTableProps {
    columns: ColumnDef<Role>[];
    data: Role[];
}
export default function RoleTable({ columns, data }: RoleTableProps) {
    return <div></div>;
}
