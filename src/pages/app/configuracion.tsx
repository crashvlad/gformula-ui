import { Layout } from '@/components/layouts/auth-layout';
import { AreasTable } from '@/components/modules/areas';
import { UsersTable } from '@/components/modules/users';

import { PageHeading } from '@/components/ui/page-heading';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTabsRouteState } from '@/hooks/useTabsRouteState';

export default function SettingsPage() {
  const { handleTabChange, activeTab } = useTabsRouteState({
    defaultValue: 'users',
  });

  return (
    <Layout>
      <PageHeading
        title="Configuración"
        description="Aquí podrás configurar tu equipo y aréas de trabajo"
      />

      <Tabs
        value={activeTab}
        defaultValue={activeTab}
        onValueChange={handleTabChange}
      >
        <TabsList className="mb-4">
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="areas">Aréas de trabajo</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <UsersTable />
        </TabsContent>
        <TabsContent value="areas">
          <AreasTable />
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
