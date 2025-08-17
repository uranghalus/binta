import { useDialog } from '@/context/dialog-context'
import { CPInspection } from '../data/CPData'
import CPInspectionDeleteDialog from './cpi-delete-dialogs'

export default function CPInspectionDialog() {
  const { open, setOpen, currentRow } = useDialog<CPInspection>()
  console.log('Current Row:', currentRow);

  return (
    <>
      {/* 
      // Kalau nanti ada dialog Add/Edit bisa didefinisikan di sini:
      // <CPInspectionActionDialog key={'cp-inspection-add'} open={open === 'add'} onOpenChange={() => setOpen('add')} />
      // {currentRow && (
      //   <CPInspectionActionDialog
      //     key={`cp-inspection-edit-${currentRow.id}`}
      //     open={open === 'edit'}
      //     onOpenChange={() => setOpen('edit')}
      //     currentRow={currentRow}
      //   />
      // )} 
      */}

      {currentRow && (
        <CPInspectionDeleteDialog
          key={`cp-inspection-delete-${currentRow.id}`}
          open={open === 'delete'}
          onOpenChange={() => setOpen('delete')}
          currentRow={currentRow as CPInspection}
        />
      )}
    </>
  )
}
