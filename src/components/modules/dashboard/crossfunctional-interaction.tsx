import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetCrossFunctionalInteraction } from '@/hooks/dashboard';
import { upperFirst } from '@mantine/hooks';

import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Text,
  Tooltip,
} from 'recharts';

export const CrossfunctionalInteraction = () => {
  const { data, isLoading } = useGetCrossFunctionalInteraction();

  const interactionData = data?.data ?? [];

  return (
    <>
      {isLoading && <Skeleton className="h-72" />}
      {!isLoading && interactionData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="font-bold text-3xl">
              Interacción Crossfuncional
            </CardTitle>
            <CardDescription>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore
              eveniet voluptatum sit?
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart
                cx="50%"
                cy="50%"
                outerRadius="90%"
                data={interactionData}
              >
                <PolarGrid stroke="hsl(var(--muted-foreground))" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={(props) => renderPolarAngleAxis(props)}
                />
                <Radar
                  name="Comentarios"
                  dataKey="A"
                  stroke="#0080C7"
                  fill="#0080C7"
                  fillOpacity={0.6}
                />
                <Radar
                  name="Votos"
                  dataKey="B"
                  stroke={'hsl(var(--primary))'}
                  fill={'hsl(var(--primary))'}
                  fillOpacity={0.6}
                />
                <Legend wrapperStyle={{ bottom: -20 }} />
                <Tooltip content={CustomTooltip} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </>
  );
};

function renderPolarAngleAxis({ payload, x, y, cx, cy, ...rest }) {
  const capitalize =
    payload.value.charAt(0).toUpperCase() +
    payload.value.slice(1).toLowerCase();
  return (
    <Text
      {...rest}
      verticalAnchor="middle"
      y={y + (y - cy) / 10}
      x={x + (x - cx) / 10}
    >
      {capitalize}
    </Text>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 rounded-lg bg-background">
        <p className="label">{`${label}`}</p>
        <div>
          {Array.from(new Set(payload)).map((pld: any) => (
            <div key={pld.value} className="flex gap-2">
              <div className="font-medium capitalize">{pld.dataKey}:</div>
              <div className="text-primary">{pld.value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
