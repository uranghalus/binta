import { Button } from '@/components/ui/button'
import { DialogProvider } from '@/context/dialog-context'
import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import { Plus, ScanQrCode } from 'lucide-react'
import { CPInspection } from './data/CPData'
import { CPInspectionColumn } from './components/cpi-column'
import CpiTable from './components/cpi-table'
import CPInspectionDialog from './components/cpi-dialogs'



interface Props {
  inspections: CPInspection[]
}

export default function Index({ inspections }: Props) {
  return (
    <AppLayout title="Inspeksi Cekpoint">
      <Head title="Inspeksi Cekpoint" />
      <DialogProvider>
        <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Data Inspeksi Cekpoint</h2>
            <p className="text-muted-foreground">
              Pengelolaan Data Inspeksi Cekpoint Security
            </p>
          </div>
          <div className="space-x-4">
            <Button asChild variant={'outline'}>
              <Link href={route('apar.scan')} className="space-x-1">
                <span>Scan QR</span>
                <ScanQrCode className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild>
              <Link href={route('inspection.cp-security.create')} className="space-x-1">
                <span>Tambah Data</span>
                <Plus className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
          <CpiTable data={inspections} columns={CPInspectionColumn} />
        </div>

        <CPInspectionDialog />
      </DialogProvider>
    </AppLayout>
  )
}
