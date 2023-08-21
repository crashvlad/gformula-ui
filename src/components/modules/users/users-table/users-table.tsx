import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { useGetUsers } from '@/hooks/users';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { Dialog } from '@radix-ui/react-dialog';
import { useState } from 'react';
import { UserDialogForm } from '../user-dialog-form';
import { RefreshCcw, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {}

export const UsersTable = ({}: Props) => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const { data, isLoading, isRefetching, refetch } = useGetUsers();

  return (
    <>
      {isLoading && <Skeleton className="h-96" />}
      {!isLoading && data && (
        <DataTable
          data={data}
          columns={columns}
          placeholder="Filtrar usuarios.."
          columnSearch="name"
          actions={
            <>
              <Button leftIcon={Icons.add} onClick={() => setIsOpenAdd(true)}>
                Añadir
              </Button>
              <Button
                variant={'outline'}
                disabled={isRefetching}
                onClick={() => refetch()}
              >
                <RefreshCcw
                  className={cn('w-5 h-5 mr-2', isRefetching && 'animate-spin')}
                />
                Recargar
              </Button>

              <Dialog open={isOpenAdd} onOpenChange={setIsOpenAdd}>
                <UserDialogForm afterMutation={() => setIsOpenAdd(false)} />
              </Dialog>
            </>
          }
        />
      )}
    </>
  );
};
