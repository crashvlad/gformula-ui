import { Layout } from '@/components/layouts/auth-layout';
import {
  UserContributionsWinners,
  UsersContributionTable,
} from '@/components/modules/users';
import { PageHeading } from '@/components/ui/page-heading';

export default function HomeAppPage() {
  return (
    <Layout>
      <PageHeading title="Salud" description="Descripcion de prueba" />
      <UserContributionsWinners />
      <UsersContributionTable />
    </Layout>
  );
}
