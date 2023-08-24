import { Layout } from '@/components/layouts/auth-layout';
import { TestsListResult } from '@/components/modules/tests';
import { PageHeading } from '@/components/ui/page-heading';

export default function ResultAppPage() {
  return (
    <Layout>
      <PageHeading title="Resultados" description="Descripcion de prueba" />

      <TestsListResult />
    </Layout>
  );
}
