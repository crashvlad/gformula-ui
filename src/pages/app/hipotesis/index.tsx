import { Layout } from '@/components/layouts/auth-layout';
import { TestsList } from '@/components/modules/tests';
import { PageHeading } from '@/components/ui/page-heading';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetTests } from '@/hooks/tests';
import {
  FileSpreadsheet,
  Flashlight,
  FlaskConical,
  FolderArchive,
  Lightbulb,
} from 'lucide-react';

export default function HypothesisPage() {
  const { data } = useGetTests();

  const tests = data ?? [];
  const hipoLength = tests.filter((i) => i.status === 'IDEA').length;
  const testLength = tests.filter((i) => i.status === 'TEST').length;
  const completeLength = tests.filter((i) => i.status === 'COMPLETED').length;
  const closeLength = tests.filter((i) => i.status === 'CLOSED').length;

  return (
    <Layout>
      <PageHeading
        title="Hipótesis"
        description="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s Lorem Ipsum has been the industry's standard dummy text ever since the 1500sLorem Ipsum has been the industry's standard dummy text ever since the 1500s"
      ></PageHeading>

      <Tabs defaultValue="hipótesis" className="">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hipótesis">
            <Lightbulb className="w-5 h-5 mr-2" />
            Hipótesis ({hipoLength})
          </TabsTrigger>
          <TabsTrigger value="experimentación">
            <FlaskConical className="w-5 h-5 mr-2" />
            Experimentación ({testLength})
          </TabsTrigger>
          <TabsTrigger value="resultados">
            <FileSpreadsheet className="w-5 h-5 mr-2" />
            Resultados ({completeLength})
          </TabsTrigger>
          <TabsTrigger value="archivados">
            <FolderArchive className="w-5 h-5 mr-2" />
            Archivados ({closeLength})
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
