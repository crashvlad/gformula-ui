import { Layout } from '@/components/layouts/auth-layout';
import { PageHeading } from '@/components/ui/page-heading';

export default function HomeAppPage() {
  return (
    <Layout>
      <PageHeading title="Dashboard" description="Descripcion de prueba" />
    </Layout>
  );
}
