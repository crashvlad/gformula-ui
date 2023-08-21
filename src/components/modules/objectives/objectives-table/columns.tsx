import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { Objective } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { ObjectivesTableActions } from './objectives-table-actions';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<Objective>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
  },
  {
    header: 'Proceso de Venta',
    cell: ({ row }) => (
      <Badge className="" variant={'outline'}>
        {row.original.type}
      </Badge>
    ),
  },
  {
    header: 'En proceso',
    cell: ({ row }) => <>{row.original.tests.length || 0}</>,
  },
  {
    header: 'Funcionaron',
    cell: ({ row }) => (
      <>
        {row.original.tests?.filter(
          (o) => o.status === 'COMPLETED' && o.resultStatus === 'WORK'
        ).length || 0}
      </>
    ),
  },
  {
    header: 'No Funcionaron',
    cell: ({ row }) => (
      <>
        {row.original.tests?.filter(
          (o) => o.status === 'COMPLETED' && o.resultStatus === 'NOT_WORK'
        ).length || 0}
      </>
    ),
  },
  {
    accessorKey: 'creator.name',
    header: 'Creado por',
  },
  {
    id: 'actions',
    cell: ({ row }) => <ObjectivesTableActions objective={row.original} />,
  },
];
