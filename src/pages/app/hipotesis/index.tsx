import { Layout } from '@/components/layouts/auth-layout';
import { TestAddDialogForm, TestsList } from '@/components/modules/tests';
import { Button } from '@/components/ui/button';
import { PageHeading } from '@/components/ui/page-heading';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetTests } from '@/hooks/tests';
import {
  FileSpreadsheet,
  Flashlight,
  FlaskConical,
  FolderArchive,
  Lightbulb,
  Plus,
} from 'lucide-react';

export default function HypothesisPage() {
  return (
    <Layout>
      <PageHeading
        title="Hipótesis"
        description="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s Lorem Ipsum has been the industry's standard dummy text ever since the 1500sLorem Ipsum has been the industry's standard dummy text ever since the 1500s"
      >
        <TestAddDialogForm />
      </PageHeading>

      <Tabs defaultValue="hipótesis" className="">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hipótesis">
            <Lightbulb className="w-5 h-5 mr-2" />
            Hipótesis
          </TabsTrigger>
          <TabsTrigger value="experimentación">
            <FlaskConical className="w-5 h-5 mr-2" />
            Experimentación
          </TabsTrigger>
          <TabsTrigger value="resultados">
            <FileSpreadsheet className="w-5 h-5 mr-2" />
            Resultados
          </TabsTrigger>
          <TabsTrigger value="archivados">
            <FolderArchive className="w-5 h-5 mr-2" />
            Archivados
          </TabsTrigger>
        </TabsList>
        <TabsContent value="hipótesis">
          <TestsList status={'IDEA'} />
        </TabsContent>
        <TabsContent value="experimentación">
          <TestsList status={'TEST'} />
        </TabsContent>
        <TabsContent value="resultados">
          <TestsList status={'COMPLETED'} />
        </TabsContent>
        <TabsContent value="archivados">
          <TestsList status={'CLOSED'} />
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
