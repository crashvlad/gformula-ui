import { Layout } from '@/components/layouts/auth-layout';
import {
  CrossfunctionalExperimentation,
  CrossfunctionalInteraction,
  ExperimentationAreas,
  ExperimentationObjective,
  GrowthHealth,
} from '@/components/modules/dashboard';
import { PageHeading } from '@/components/ui/page-heading';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTabsRouteState } from '@/hooks/useTabsRouteState';

export default function DashboardAppPage() {
  const { handleTabChange, activeTab } = useTabsRouteState({
    defaultValue: 'cross-experimentation',
  });

  return (
    <Layout>
      <PageHeading title="Dashboard" description="Descripcion de prueba" />

      <Tabs
        value={activeTab}
        defaultValue={activeTab}
        onValueChange={handleTabChange}
      >
        <TabsList className="grid items-center w-full h-auto grid-cols-3 mb-6 place-content-center">
          <TabsTrigger value="cross-experimentation" className="px-3 py-2">
            Experimentación Cross Funcional
          </TabsTrigger>
          <TabsTrigger value="cross-interaction" className="px-3 py-2">
            Interacción Cross Funcional
          </TabsTrigger>
          <TabsTrigger value="exp-objective" className="px-3 py-2">
            Experimentación por Objetivo
          </TabsTrigger>
          <TabsTrigger value="exp-area" className="px-3 py-2">
            Experimentación por Área
          </TabsTrigger>
          <TabsTrigger value="growth-health" className="px-3 py-2">
            Growth Health
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cross-experimentation">
          <CrossfunctionalExperimentation />
        </TabsContent>
        <TabsContent value="cross-interaction">
          <CrossfunctionalInteraction />
        </TabsContent>
        <TabsContent value="exp-objective">
          <ExperimentationObjective />
        </TabsContent>
        <TabsContent value="exp-area">
          <ExperimentationAreas />
        </TabsContent>
        <TabsContent value="growth-health">
          <GrowthHealth />
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
