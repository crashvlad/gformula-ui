import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { User } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { UserTableActions } from './users-table-actions';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
  },
  {
    accessorKey: 'email',
    header: 'Correo Electrónico',
  },
  {
    accessorKey: 'targetArea',
    header: 'Área de trabajo',
  },

  {
    id: 'actions',
    cell: ({ row }) => <UserTableActions user={row.original} />,
  },
];
