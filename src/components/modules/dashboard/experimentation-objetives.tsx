import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetTargetExperimentationData } from '@/hooks/dashboard';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

export const ExperimentationObjective = () => {
  const { data, isLoading } = useGetTargetExperimentationData();

  const experimentationData = data?.targetExperimentationData ?? [];
  return (
    <>
      {isLoading && <Skeleton className="h-72" />}
      {!isLoading && experimentationData.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={experimentationData}>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Bar dataKey="total" fill="#02EEB1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </>
  );
};
