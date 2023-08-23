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
import { Skeleton } from '@/components/ui/skeleton';
import { ROUTES } from '@/config/routes';
import { useGetTests } from '@/hooks/tests';
import { getFormatDateDistance } from '@/lib/date';
import { Experiment } from '@/types';
import {
  CalendarDays,
  Eye,
  MoreVerticalIcon,
  Pencil,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';

export const TestsList = ({ status }) => {
  const { data, isLoading } = useGetTests({ status });

  return (
    <div className="mt-6">
      <section className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading && (
          <>
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-72" />
            ))}
          </>
        )}
        {!isLoading &&
          data &&
          data.map((t) => <TestListCard key={t.id} test={t} />)}
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
