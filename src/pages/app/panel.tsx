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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

enum DHASBOARDTABS {
  EXPERIMENTATION = 'cross-experimentation',
  INTERACTION = 'cross-interaction',
  OBJECTIVE = 'exp-objective',
  AREA = 'exp-area',
  HEALTH = 'growth-health',
}

export default function DashboardAppPage() {
  const { handleTabChange, activeTab } = useTabsRouteState({
    defaultValue: 'cross-experimentation',
  });

  return (
    <Layout>
      <PageHeading title="Dashboard" description="Descripcion de prueba">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" leftIcon={ChevronDown}>
              Ver Métricas
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64" align="end">
            <DropdownMenuLabel>Charts</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={activeTab}
              onValueChange={handleTabChange}
            >
              <DropdownMenuRadioItem value={DHASBOARDTABS.EXPERIMENTATION}>
                Experimentación Cross Funcional
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value={DHASBOARDTABS.INTERACTION}>
                Interacción Cross Funcional
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value={DHASBOARDTABS.OBJECTIVE}>
                Experimentación por Objetivo
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value={DHASBOARDTABS.AREA}>
                Experimentación por Área
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value={DHASBOARDTABS.HEALTH}>
                Growth Health
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </PageHeading>

      <Tabs
        defaultValue={activeTab}
        value={activeTab}
        onValueChange={handleTabChange}
      >
        <TabsContent value={DHASBOARDTABS.EXPERIMENTATION}>
          <CrossfunctionalExperimentation />
        </TabsContent>
        <TabsContent value={DHASBOARDTABS.INTERACTION}>
          <CrossfunctionalInteraction />
        </TabsContent>
        <TabsContent value={DHASBOARDTABS.OBJECTIVE}>
          <ExperimentationObjective />
        </TabsContent>
        <TabsContent value={DHASBOARDTABS.AREA}>
          <ExperimentationAreas />
        </TabsContent>
        <TabsContent value={DHASBOARDTABS.HEALTH}>
          <GrowthHealth />
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
