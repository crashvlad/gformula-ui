import Link from 'next/link';
import { Layout } from '@/components/layouts/auth-layout';
import { buttonVariants } from '@/components/ui/button';
import { PageHeading } from '@/components/ui/page-heading';
import { ArrowLeft } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import { useSearchParams } from 'next/navigation';
import { useGetTest } from '@/hooks/tests';
import {
  TestComments,
  TestDetail,
  TestDetailAction,
} from '@/components/modules/tests';
import { Skeleton } from '@/components/ui/skeleton';

export default function TestDetailPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const { data, isLoading } = useGetTest(Number(id), Boolean(id));

  return (
    <Layout>
      <PageHeading title="Detalle Hipótesis">
        <Link
          href={ROUTES.app_hypothesis}
          className={buttonVariants({ variant: 'outline' })}
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Regresar
        </Link>

        {isLoading && <Skeleton className="w-24 h-10" />}

        {!isLoading && data && <TestDetailAction test={data} />}
      </PageHeading>

      <div className="grid items-start gap-4 md:grid-cols-2">
        <TestDetail />
        <TestComments />
      </div>
    </Layout>
  );
}
