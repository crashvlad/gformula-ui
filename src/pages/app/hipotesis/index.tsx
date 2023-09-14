import { Layout } from '@/components/layouts/auth-layout';
import {
  TestsListTabsHeader,
  TestsListTabsContent,
  TABS_LIST,
} from '@/components/modules/tests';
import { PageHeading } from '@/components/ui/page-heading';

import { Tabs } from '@/components/ui/tabs';
import { useTabsRouteState } from '@/hooks/useTabsRouteState';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function HypothesisPage() {
  const { activeTab, handleTabChange } = useTabsRouteState({
    defaultValue: TABS_LIST.IDEA,
  });

  return (
    <Layout>
      <PageHeading
        title="Hipótesis"
        description="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s Lorem Ipsum has been the industry's standard dummy text ever since the 1500sLorem Ipsum has been the industry's standard dummy text ever since the 1500s"
      />

      <Tabs
        value={activeTab}
        defaultValue={activeTab}
        onValueChange={handleTabChange}
      >
        <TestsListTabsHeader />
        <TestsListTabsContent />
      </Tabs>
    </Layout>
  );
}
