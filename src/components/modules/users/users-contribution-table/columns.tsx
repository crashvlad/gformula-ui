import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorFn: (originalRow) => originalRow.tests,
    header: 'Total Contribución',
    cell: ({ row }) => (
      <div className="text-primary">
        {row.original?.tests?.length || 0} Contribuciones
      </div>
    ),
  },
  {
    accessorKey: 'Funcionaron',
    header: ({}) => <div className="text-center">Funcionaron</div>,
    cell: ({ row }) => (
      <div className="text-xl font-medium text-center text-primary">
        {row.original?.tests?.filter((t) => t.resultStatus === 'WORK').length ||
          0}
      </div>
    ),
  },
  {
    accessorKey: 'No funcionaron',
    header: ({}) => <div className="text-center">No Funcionaron</div>,
    cell: ({ row }) => (
      <div className="text-xl font-medium text-center text-primary">
        {row.original?.tests?.filter((t) => t.resultStatus === 'NOT_WORK')
          .length || 0}
      </div>
    ),
  },
  {
    accessorKey: 'No concluyeron',
    header: ({}) => <div className="text-center">No Concluyeron</div>,
    cell: ({ row }) => (
      <div className="text-xl font-medium text-center text-primary">
        {row.original?.tests?.filter((t) => t.resultStatus === 'NOT_CONCLUSIVE')
          .length || 0}
      </div>
    ),
  },
];
