import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetTests } from '@/hooks/tests';
import { cn } from '@/lib/utils';
import { RefreshCcw } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { z } from 'zod';
import { TestListResultCard } from './test-list-result-card';
import { TestListResultFilterForm } from './test-list-result-filter-form';

const testEditSchema = z.object({
  resultStatus: z.string(),
  type: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

export const TestsListResult = ({}) => {
  const searchParams = useSearchParams();

  const type = searchParams?.get('type') ?? '';
  const resultStatus = searchParams?.get('resultStatus') ?? '';
  const startDate = searchParams?.get('startDate') ?? '';
  const endDate = searchParams?.get('endDate') ?? '';

  const { isLoading, tests, refetch, isRefetching } = useGetTests({
    status: 'COMPLETED',
    filter: {
      type,
      resultStatus,
      startDate,
      endDate,
    },
  });
  const [query, setQuery] = useState('');

  const filteredTests = useMemo(() => {
    return query != null && query.length > 0
      ? tests.filter((user) => {
          return user.name?.toLowerCase().includes(query.toLowerCase());
        })
      : tests;
  }, [tests, query]);

  return (
    <div className="mt-6 space-y-8">
      <header className="flex flex-col justify-between w-full gap-4 md:flex-row">
        <Input
          placeholder={'Filtrar hipótesis...'}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="max-w-xs"
        />

        <div className="flex gap-5">
          <TestListResultFilterForm />

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
        </div>
      </header>

      <section className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading && (
          <>
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-72" />
            ))}
          </>
        )}

        {!isLoading && filteredTests.length === 0 && (
          <div className="flex items-center justify-center col-span-1 py-16 text-xl font-bold border rounded-lg h-72">
            No hay resultados
          </div>
        )}

        {!isLoading &&
          filteredTests.length > 0 &&
          filteredTests.map((t) => <TestListResultCard key={t.id} test={t} />)}
      </section>
    </div>
  );
};
