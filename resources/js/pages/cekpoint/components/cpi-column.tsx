import { DataTableColumnHeader } from '@/components/datatable-column-header'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { CPInspection } from '../data/CPData'
import CPInspectionRowAction from './cpi-row-action'


export const CPInspectionColumn: ColumnDef<CPInspection>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    meta: {
      className: cn(
        'sticky left-0 z-10 rounded-tl md:table-cell',
        'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted transition-colors duration-200',
      ),
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'user.name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Petugas" />,
    cell: ({ row }) => <span className="font-normal">{row.original.user?.karyawan.nama}</span>,
  },
  {
    accessorKey: 'regu',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Shift" />,
    cell: ({ row }) => <span className="font-medium">{row.getValue('regu') || '-'}</span>,
  },
  {
    accessorKey: 'cekPoint.nama',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Cek Point" />,
    cell: ({ row }) => <span className="font-medium">{row.original.cek_point?.kode_cekpoint} - {row.original.cek_point?.lokasi}</span>,
  },
  {
    accessorKey: 'kondisi',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Kondisi" />,
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.kondisi === 'Baik'
            ? 'success'
            : row.original.kondisi === 'Rusak'
              ? 'destructive'
              : 'neutral'
        }
      >
        {row.original.kondisi || '-'}
      </Badge>
    ),
  },
  {
    accessorKey: 'penerangan_lampu',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Penerangan" />,
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.penerangan_lampu === 'Baik'
            ? 'success'
            : row.original.penerangan_lampu === 'Rusak'
              ? 'destructive'
              : 'neutral'
        }
      >
        {row.original.penerangan_lampu || '-'}
      </Badge>
    ),
  },
  {
    accessorKey: 'kerusakan_fasum',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Fasilitas Umum" />,
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.kerusakan_fasum === 'Rusak'
            ? 'destructive'
            : row.original.kerusakan_fasum === 'Baik'
              ? 'success'
              : 'neutral'
        }
      >
        {row.original.kerusakan_fasum || '-'}
      </Badge>
    ),
  },
  {
    accessorKey: 'tanggal_patroli',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tanggal Patroli" />,
    cell: ({ row }) => {
      const date = new Date(row.original.tanggal_patroli)
      return <span className="font-medium">{date.toLocaleString('id-ID')}</span>
    },
  },
  {
    id: 'action',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Aksi" />,
    cell: CPInspectionRowAction,
  },
]
