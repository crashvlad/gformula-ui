import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { useState } from 'react';
import { RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGetMetrics } from '@/hooks/metrics';
import { Dialog } from '@/components/ui/dialog';
import { MetricDialogForm } from '../metric-dialog-form';

interface Props {}

export const MetricsTable = ({}: Props) => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);

  const { data, isLoading, refetch, isRefetching } = useGetMetrics();
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
                <MetricDialogForm afterMutation={() => setIsOpenAdd(false)} />
              </Dialog>
            </>
          }
          data={data}
          columns={columns}
          placeholder="Filtrar métricas.."
          columnSearch="name"
        />
      )}
    </>
  );
};
