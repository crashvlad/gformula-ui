import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CalendarDays } from 'lucide-react';
import { getFormatDateDistance } from '@/lib/date';
import { Skeleton } from '@/components/ui/skeleton';
import { useSearchParams } from 'next/navigation';
import { useGetObjective } from '@/hooks';
export function ObjectiveDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const { data, isLoading } = useGetObjective(Number(id), Boolean(id));
  return (
    <>
      {isLoading && <Skeleton className="h-96" />}
      {!isLoading && data && (
        <Card>
          <CardHeader>
            <CardTitle>{data.name}</CardTitle>
            <CardDescription>
              Creado por {data.creator.name} * hace{' '}
              {getFormatDateDistance(data.createdAt ?? '')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h5 className="text-xl font-semibold tracking-tight scroll-m-20">
              Descripción del objetivo
            </h5>
            <p className="mb-4 leading-7 text-muted-foreground">
              {data.description}
            </p>

            <h5 className="text-xl font-semibold tracking-tight scroll-m-20">
              Numero de tests
            </h5>
            <p className="leading-7 text-muted-foreground">
              {data.tests.length}
            </p>

            <div className="flex items-center justify-around">
              <p className="flex flex-col items-center space-y-2">
                <span className="text-lg font-medium">Fecha de inicio</span>
                <span className="flex items-center">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  {data.startDate}
                </span>
              </p>
              <p className="flex flex-col items-center space-y-2">
                <span className="text-lg font-medium">Fecha de fin</span>
                <span className="flex items-center">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  {data.endDate}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
