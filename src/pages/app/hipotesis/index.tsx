import { Layout } from '@/components/layouts/auth-layout';
import { PageHeading } from '@/components/ui/page-heading';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  FileSpreadsheet,
  Flashlight,
  FlaskConical,
  FolderArchive,
  Lightbulb,
} from 'lucide-react';

export default function HomeAppPage() {
  return (
    <Layout>
      <PageHeading
        title="Hipótesis"
        description="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
      />

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
        <TabsContent value="hipótesis">Fase hipótesis</TabsContent>
        <TabsContent value="experimentación">Fase experimentación</TabsContent>
        <TabsContent value="resultados">Fase resultados</TabsContent>
        <TabsContent value="archivados">Fase archivados</TabsContent>
      </Tabs>
    </Layout>
  );
}
