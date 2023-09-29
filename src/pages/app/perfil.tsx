import { Layout } from '@/components/layouts/auth-layout';
import { UserProfile } from '@/components/modules/users/user-profile';

export default function ProfilePage() {
  return (
    <Layout>
      <UserProfile />
    </Layout>
  );
}
