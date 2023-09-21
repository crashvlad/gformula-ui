import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetTargetExperimentationData } from '@/hooks/dashboard';
import { shortenText } from '@/lib/utils';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export const ExperimentationObjective = () => {
  const { data, isLoading } = useGetTargetExperimentationData();

  const experimentationData = data?.targetExperimentationData ?? [];
  return (
    <>
      {isLoading && <Skeleton className="h-72" />}
      {!isLoading && experimentationData.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" aspect={3}>
              <BarChart data={experimentationData}>
                <XAxis
                  dataKey="name"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(label) => {
                    return shortenText(label, 15);
                  }}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                  domain={['dataMin', 'dataMax']}
                />
                <CartesianGrid
                  strokeDasharray="4 1 2"
                  stroke="hsl(var(--muted))"
                />
                <Bar
                  dataKey="total"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
                <Legend
                  formatter={(e) => {
                    return e.toUpperCase();
                  }}
                />
                <Tooltip
                  content={CustomTooltip}
                  cursor={{ fill: 'transparent' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 rounded-lg bg-background">
        <p className="label">{`${label}`}</p>
        <div>
          {payload.map((pld) => (
            <div key={pld.value} className="flex gap-2 capitalize">
              <div className="font-medium">{pld.dataKey}:</div>
              <div className="text-primary">{pld.value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
