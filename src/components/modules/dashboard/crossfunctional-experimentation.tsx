import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetCrossFunctionalExperimentation } from '@/hooks/dashboard';
import { Chart } from 'react-google-charts';

const dataSankey = [
  ['FROM', 'TO', 'WEIGHT'],
  ['GROWTH', 'FINANZAS', 5],
  ['GROWTH', 'DESARROLLO WEB', 1],
  ['GROWTH', 'DISEÑO UI/UX', 1],
  ['FINANZAS', 'MARKETING', 2],
  ['FINANZAS', 'ANALYTICS', 1],
  ['DESARROLLO WEB', 'MARKETING', 2],
  ['DESARROLLO WEB', 'ANALYTICS', 1],
  ['DISEÑO UI/UX', 'MARKETING', 1],
  ['DISEÑO UI/UX', 'ANALYTICS', 1],
  ['MARKETING', 'VENTAS', 2],
  ['MARKETING', 'LOGÍSTICA', 3],
];

export const options = {
  sankey: {
    link: { color: { fill: '#02EEB1' } }, // Un tono de rojo más claro para un mejor contraste
    node: {
      colors: ['#02EEB1'], // Un tono de rojo más claro para un mejor contraste
      label: { color: '#000000' }, // Un rojo más brillante para un mejor contraste con el fondo
    },
  },
};

export const CrossfunctionalExperimentation = () => {
  const { data, isLoading } = useGetCrossFunctionalExperimentation();

  const interactionData = data?.data ?? [];

  return (
    <>
      {isLoading && <Skeleton className="h-72" />}
      {!isLoading && dataSankey.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <Chart
              chartType="Sankey"
              width="100%"
              height="300px"
              data={dataSankey}
              options={options}
            />
            {/* <ResponsiveContainer width="100%" height={300}>
             
            </ResponsiveContainer> */}
          </CardContent>
        </Card>
      )}
    </>
  );
};
