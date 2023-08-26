import { Layout } from '@/components/layouts/auth-layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ROUTES } from '@/config/routes';
import { cn } from '@/lib/utils';
import Link from 'next/link';
export default function HomePage() {
  return (
    <Layout>
      <Tabs
        defaultValue="hipothesis"
        className=" max-w-3xl mx-auto mt-10 w-full"
      >
        <TabsList className="w-full gap-5 md:gap-0 flex bg-transparent mb-10">
          <StepItem value={'hipothesis'} label={'1'} />
          <Separator
            orientation="horizontal"
            className="hidden md:block w-14 bg-primary h-1.5"
          />
          <StepItem value={'results'} label={'2'} />
          <Separator
            orientation="horizontal"
            className="hidden md:block w-14 bg-primary h-1.5"
          />
          <StepItem value={'metric'} label={'3'} />
          <Separator
            orientation="horizontal"
            className="hidden md:block w-14 bg-primary h-1.5"
          />
          <StepItem value={'dashboard'} label={'4'} />
        </TabsList>

        <TabsContent value="hipothesis">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Hipótesis</CardTitle>
              <CardDescription>
                Crea ideas de experimentación según una hipótesis y describe su
                impacto en los procesos de crecimiento.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center">
              <Link href={ROUTES.app_hypothesis}>
                <Button>Comienza a experimentar!</Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="results">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Resultados</CardTitle>
              <CardDescription>
                Mira y compara los resultados de los experimentos de tus equipos
                y aprende de las hipótesis.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center">
              <Link href={ROUTES.app_results}>
                <Button>Ver Resultados!</Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="metric">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Métrica Clave</CardTitle>
              <CardDescription>
                Sigue los objetivos planteados por tus equipos y mide los
                indicadores clave de los experimentos.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center">
              <Link href={ROUTES.app_metric}>
                <Button>Ver Metricas!</Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="dashboard">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Tablero</CardTitle>
              <CardDescription>
                Revisa los reportes para conocer el impacto de las hipótesis y
                tomar las mejores decisiones.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center">
              <Link href={ROUTES.app_dashboard}>
                <Button>Ver Tablero!</Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}

const StepItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <TabsTrigger
      value={value}
      className={cn(
        'rounded-full border text-xl !text-primary border-primary h-10 md:h-14 w-10 md:w-14 data-[state=active]:bg-primary data-[state=active]:!text-background'
      )}
    >
      {label}
    </TabsTrigger>
  );
};
