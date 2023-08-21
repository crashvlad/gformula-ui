import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { useGetUsers } from '@/hooks/users';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetAreas } from '@/hooks/areas';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { AreaDialogForm } from '../area-dialog-form';
import { RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {}

export const AreasTable = ({}: Props) => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);

  const { data, isLoading, refetch, isRefetching } = useGetAreas();
  return (
    <>
      {isLoading && <Skeleton className="h-96" />}
      {!isLoading && data && (
        <DataTable
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
                <AreaDialogForm afterMutation={() => setIsOpenAdd(false)} />
              </Dialog>
            </>
          }
          data={data}
          columns={columns}
          placeholder="Filtrar áreas de trabajo.."
          columnSearch="name"
        />
      )}
    </>
  );
};
