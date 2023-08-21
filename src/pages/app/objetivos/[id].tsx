import Link from 'next/link';
import { Layout } from '@/components/layouts/auth-layout';
import { buttonVariants } from '@/components/ui/button';
import { PageHeading } from '@/components/ui/page-heading';
import { ArrowLeft } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import {
  ObjectiveComments,
  ObjectiveDetail,
} from '@/components/modules/objectives';

export default function ObjetiveDetailPage() {
  return (
    <Layout>
      <PageHeading title="">
        <Link
          href={ROUTES.app_objectives}
          className={buttonVariants({ variant: 'outline' })}
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Regresar
        </Link>
      </PageHeading>

      <div className="grid items-start gap-4 md:grid-cols-2">
        <ObjectiveDetail />
        <ObjectiveComments />
      </div>
    </Layout>
  );
}
