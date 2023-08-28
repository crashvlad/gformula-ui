import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetCrossFunctionalInteraction } from '@/hooks/dashboard';

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';

export const CrossfunctionalInteraction = () => {
  const { data, isLoading } = useGetCrossFunctionalInteraction();

  const interactionData = data?.data ?? [];

  return (
    <>
      {isLoading && <Skeleton className="h-72" />}
      {!isLoading && interactionData.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart
                cx="50%"
                cy="50%"
                outerRadius="80%"
                data={interactionData}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar
                  name="Mike"
                  dataKey="A"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </>
  );
};
