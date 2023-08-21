import { Layout } from '@/components/layouts/auth-layout';
import { MetricsTable } from '@/components/modules/metrics';
import { PageHeading } from '@/components/ui/page-heading';

export default function HomeAppPage() {
  return (
    <Layout>
      <PageHeading
        title="Métricas Clave"
        description="Una descripción sobre las metricas claves"
      />

      <MetricsTable />
    </Layout>
  );
}
