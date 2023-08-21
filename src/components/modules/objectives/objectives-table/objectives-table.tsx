import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetObjectives } from '@/hooks';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PlusIcon, RefreshCcw } from 'lucide-react';
import { ObjectiveDialogForm } from '../objective-dialog-form';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Props {}

export const ObjectivesTable = ({}: Props) => {
  const { data, isLoading, isRefetching, refetch } = useGetObjectives();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {isLoading && <Skeleton className="h-96" />}

      {!isLoading && data && (
        <DataTable
          actions={
            <>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button leftIcon={PlusIcon}>Añadir</Button>
                </DialogTrigger>
                <ObjectiveDialogForm afterMutation={() => setOpen(false)} />
              </Dialog>

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
            </>
          }
          data={data}
          columns={columns}
          placeholder="Filtrar objetivos.."
          columnSearch="name"
        />
      )}
    </>
  );
};
