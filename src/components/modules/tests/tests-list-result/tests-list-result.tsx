import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetTests } from '@/hooks/tests';
import { cn } from '@/lib/utils';
import { FilterIcon, Plus, RefreshCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import { TestListResultCard } from './test-list-result-card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RESULTS_OPTIONS, SALES_PROCESS_IMPACT_OPTIONS } from '@/lib/contants';
import { useSearchParams } from 'next/navigation';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';
import { useRouter } from 'next/router';
import { ROUTES } from '@/config/routes';

const testEditSchema = z.object({
  resultStatus: z.string(),
  type: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

export const TestsListResult = ({}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { createQueryString } = useCreateQueryString();

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

  const form = useForm<z.infer<typeof testEditSchema>>({
    resolver: zodResolver(testEditSchema),
  });

  const filteredTests = useMemo(() => {
    return query != null && query.length > 0
      ? tests.filter((user) => {
          return user.name?.toLowerCase().includes(query.toLowerCase());
        })
      : tests;
  }, [tests, query]);

  async function onSubmit(values: z.infer<typeof testEditSchema>) {}

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
          <Popover>
            <PopoverTrigger asChild>
              <Button className="ml-auto">
                Filtros <FilterIcon className="w-4 h-4 ml-2" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96" align="end">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="resultStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo</FormLabel>
                        <Select
                          onValueChange={(e) => {
                            field.onChange(e);

                            router.push(
                              `${router.pathname}?${createQueryString({
                                type: e,
                              })}`
                            );
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona una opción" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {SALES_PROCESS_IMPACT_OPTIONS.map((s) => (
                              <SelectItem value={s.value} key={s.id}>
                                {s.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="resultStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Resultado </FormLabel>
                        <Select
                          onValueChange={(e) => {
                            field.onChange(e);

                            router.push(
                              `${router.pathname}?${createQueryString({
                                resultStatus: e,
                              })}`
                            );
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona una opción" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {RESULTS_OPTIONS.map((s) => (
                              <SelectItem value={s.value} key={s.id}>
                                {s.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid space-y-8 md:space-y-0 md:gap-5 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Desde</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              onChange={(e) => {
                                field.onChange(e.target.value);

                                router.push(
                                  `${router.pathname}?${createQueryString({
                                    startDate: e.target.value,
                                  })}`
                                );
                              }}
                              type="date"
                              placeholder=""
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hasta</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              onChange={(e) => {
                                field.onChange(e.target.value);

                                router.push(
                                  `${router.pathname}?${createQueryString({
                                    endDate: e.target.value,
                                  })}`
                                );
                              }}
                              type="date"
                              placeholder=""
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button
                      type="button"
                      onClick={(e) => {
                        router.push(ROUTES.app_results);
                      }}
                    >
                      Limpiar Filtros
                    </Button>
                  </div>
                </form>
              </Form>
            </PopoverContent>
          </Popover>

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
