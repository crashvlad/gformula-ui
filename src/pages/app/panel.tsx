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

export default function HomeAppPage() {
  return (
    <Layout>
      <PageHeading title="Dashboard" description="Descripcion de prueba" />

      <Tabs defaultValue="cross-experimentation" className="">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="cross-experimentation">
            Experimentación Cross Funcional
          </TabsTrigger>
          <TabsTrigger value="cross-interaction">
            Interacción Cross Funcional
          </TabsTrigger>
          <TabsTrigger value="exp-objective">
            Experimentación por Objetivo
          </TabsTrigger>
          <TabsTrigger value="exp-area">Experimentación por Área</TabsTrigger>
          <TabsTrigger value="growth-health">Growth Health</TabsTrigger>
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
