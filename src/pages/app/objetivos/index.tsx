import { Layout } from '@/components/layouts/auth-layout';
import { ObjectivesTable } from '@/components/modules/objectives';

import { PageHeading } from '@/components/ui/page-heading';
import { useState } from 'react';

export default function ObjetivesPage() {
  return (
    <Layout>
      <PageHeading
        title="Objetivos"
        description="Descripcion de los objetivos"
      />

      <ObjectivesTable />
    </Layout>
  );
}
