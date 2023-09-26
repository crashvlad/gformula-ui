import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
          <CardHeader>
            <CardTitle className="font-bold text-3xl">
              Experimentación Objetivos
            </CardTitle>
            <CardDescription>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore
              eveniet voluptatum sit?
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={experimentationData} margin={{ left: -45 }}>
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
                  barSize={85}
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
