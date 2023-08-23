import { useUser } from '@/components/context/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { ROUTES } from '@/config/routes';
import { useGetTests } from '@/hooks/tests';
import { getFormatDateDistance } from '@/lib/date';
import { cn } from '@/lib/utils';
import { Experiment } from '@/types';
import {
  CalendarDays,
  Eye,
  MoreVerticalIcon,
  Pencil,
  RefreshCcw,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { TestAddDialogForm } from './test-add-dialog-form';

export const TestsList = ({ status }) => {
  const { data, isLoading, tests, refetch, isRefetching } = useGetTests({
    status,
  });
  const [query, setQuery] = useState('');

  const filteredTests = useMemo(() => {
    return query != null && query.length > 0
      ? tests.filter((user) => {
          return user.name?.toLowerCase().includes(query.toLowerCase());
        })
      : tests;
  }, [tests, query]);

  console.log({ filteredTests });

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
          <TestAddDialogForm />

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
          filteredTests.map((t) => <TestListCard key={t.id} test={t} />)}
      </section>
    </div>
  );
};

const TestListCard = ({ test }: { test: Experiment }) => {
  const { user } = useUser();

  const isOwner = user?.id === test.creator.id;

  return (
    <Link href={ROUTES.app_hypothesis_detail(test.id)}>
      <Card className="flex flex-col h-full px-0">
        <CardHeader>
          <CardTitle className="line-clamp-1">{test.name}</CardTitle>
          <CardDescription>
            Creado por {test.creator.name}
            <br />
            <span className="flex gap-2 mt-2">
              <CalendarDays className="w-4 h-4" />
              hace {getFormatDateDistance(test.createdAt)}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <p className="line-clamp-3">{test.description}</p>
        </CardContent>

        <CardFooter className="flex justify-between mt-auto">
          <Badge variant="outline">{test.type}</Badge>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
              >
                <MoreVerticalIcon className="w-4 h-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuGroup>
                <DropdownMenuItem className="flex justify-between" asChild>
                  <Link href={ROUTES.app_hypothesis_detail(test.id)}>
                    Ver
                    <Eye className="w-4 h-4" />
                  </Link>
                </DropdownMenuItem>
                {isOwner && (
                  <DropdownMenuItem className="flex justify-between">
                    Editar
                    <Pencil className="w-4 h-4" />
                  </DropdownMenuItem>
                )}
              </DropdownMenuGroup>
              {isOwner && (
                <>
                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <DropdownMenuItem className="flex justify-between">
                      Archivar
                      <Trash2 className="w-4 h-4" />
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>
    </Link>
  );
};
