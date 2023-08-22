import Link from 'next/link';
import { Layout } from '@/components/layouts/auth-layout';
import { buttonVariants } from '@/components/ui/button';
import { PageHeading } from '@/components/ui/page-heading';
import { ArrowLeft } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  MetricCardsStats,
  MetricLineChartCard,
} from '@/components/modules/metrics';

export default function MetricDetailPage() {
  return (
    <Layout>
      <PageHeading title="Detalles de métrica">
        <Link
          href={ROUTES.app_metric}
          className={buttonVariants({ variant: 'outline' })}
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Regresar
        </Link>
      </PageHeading>

      <div className="grid grid-cols-3 gap-8">
        <div className="flex flex-col col-span-3 gap-5 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Lorem ipsum dolor sit.</CardTitle>
            </CardHeader>

            <CardContent className="text-muted-foreground">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos
              voluptates reiciendis aliquam, nulla obcaecati dignissimos
              asperiores facilis at sed odit et rerum nisi animi dolore sit?
              Iusto optio sit velit quam expedita repellat, natus, quisquam
              dolore dignissimos placeat debitis libero mollitia ipsa beatae
              amet facere non dicta ex nemo fuga!
            </CardContent>
          </Card>

          <MetricLineChartCard />
        </div>
        <div className="flex flex-col col-span-3 gap-5 md:col-span-1">
          <MetricCardsStats
            title={'Objetivos'}
            description="+180.1% desde el mes pasado"
          />
          <MetricCardsStats
            title={'Hipótesis'}
            description="+180.1% desde el mes pasado"
          />
        </div>
      </div>
    </Layout>
  );
}
