import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetCrossFunctionalExperimentation } from '@/hooks/dashboard';
import * as am5 from '@amcharts/amcharts5';
import * as am5venn from '@amcharts/amcharts5/venn';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

    import { useEffect, useLayoutEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('./chart').then((m) => m.Chart), {
  ssr: false,
});

let data = [
  { name: 'A', value: 10 },
  { name: 'B', value: 8 },
  { name: 'C', value: 5 },
  { name: 'X', value: 2, sets: ['A', 'B'] },
  { name: 'Y', value: 2, sets: ['A', 'C'] },
  { name: 'Z', value: 2, sets: ['B', 'C'] },
  { name: 'Q', value: 1, sets: ['A', 'B', 'C'] },
];

export const CrossfunctionalExperimentation = () => {
  const { data, isLoading } = useGetCrossFunctionalExperimentation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const interactionData = data?.data ?? [];

  return (
    <>
      <Card>
        <CardContent className="p-6">
          <Chart />
        </CardContent>
      </Card>
      {isLoading && <Skeleton className="h-72" />}
      {!isLoading && interactionData.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <Chart />
          </CardContent>
        </Card>
      )}
    </>
  );
};
