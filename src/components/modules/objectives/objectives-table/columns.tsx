import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { Objective } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { ObjectivesTableActions } from './objectives-table-actions';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ROUTES } from '@/config/routes';
import { SALES_PROCESS_IMPACT_DICTIONARY } from '@/lib/contants';

export const columns: ColumnDef<Objective>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => (
      <Link
        className="flex w-full"
        href={ROUTES.app_objectives_detail(row.original.id)}
      >
        {row.original.name}
      </Link>
    ),
  },
  {
    header: 'Proceso de Venta',
    cell: ({ row }) => (
      <Badge className="" variant={'outline'}>
        {SALES_PROCESS_IMPACT_DICTIONARY[row.original.type]}
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
