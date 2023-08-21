import Link from 'next/link';
import { Layout } from '@/components/layouts/auth-layout';
import { buttonVariants } from '@/components/ui/button';
import { PageHeading } from '@/components/ui/page-heading';
import { ArrowLeft } from 'lucide-react';
import { ROUTES } from '@/config/routes';

export default function MetricDetailPage() {
  return (
    <Layout>
      <PageHeading title="Detalles de métrica">
        <Link
          href={ROUTES.app_objectives}
          className={buttonVariants({ variant: 'outline' })}
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Regresar
        </Link>
      </PageHeading>
    </Layout>
  );
}
