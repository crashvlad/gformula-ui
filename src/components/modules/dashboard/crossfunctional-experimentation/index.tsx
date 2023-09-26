import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetCrossFunctionalExperimentation } from '@/hooks/dashboard';
import dynamic from 'next/dynamic';
import { ResponsiveContainer } from 'recharts';

const Chart = dynamic(
  async () => (await import('./chart')).CrossfunctionalExperimentationChart,
  { ssr: false }
);

export const CrossfunctionalExperimentation = () => {
  const { data, isLoading, error } = useGetCrossFunctionalExperimentation();

  const interactionData = data?.data ?? [];

  console.log(interactionData);

  return (
    <>
      {isLoading && <Skeleton className="h-72" />}
      {!isLoading && interactionData.sankeyData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="font-bold text-3xl">
              Experimentación Crossfuncional
            </CardTitle>
            <CardDescription>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore
              eveniet voluptatum sit?
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width={'100%'} aspect={3}>
              <Chart
                data={interactionData.sankeyData}
                labels={interactionData.objAreasString}
              />
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </>
  );
};
