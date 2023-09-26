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

enum DhasboardTabs {
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
              <DropdownMenuRadioItem value="cross-experimentation">
                Experimentación Cross Funcional
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="cross-interaction">
                Interacción Cross Funcional
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="exp-objective">
                Experimentación por Objetivo
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="exp-area">
                Experimentación por Área
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="growth-health">
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
