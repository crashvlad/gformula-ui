import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { ColumnDef } from '@tanstack/react-table';
import { MetricsTableActions } from './metrics-table-actions';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <MetricsTableActions metric={row.original} />,
  },
];
