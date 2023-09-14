import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetTests } from '@/hooks/tests';
import {
  FileSpreadsheet,
  FlaskConical,
  FolderArchive,
  Lightbulb,
} from 'lucide-react';
import { TABS_LIST } from '.';

export const TestsListTabsHeader = () => {
  const { data } = useGetTests();

  const tests = data ?? [];
  const hipoLength = tests.filter((i) => i.status === 'IDEA').length;
  const testLength = tests.filter((i) => i.status === 'TEST').length;
  const completeLength = tests.filter((i) => i.status === 'COMPLETED').length;
  const closeLength = tests.filter((i) => i.status === 'CLOSED').length;

  return (
    <TabsList className="grid w-full h-auto grid-cols-1 md:grid-cols-4">
      <TabsTrigger
        value={TABS_LIST.IDEA}
        className="py-3 text-lg md:text-base md:py-2"
      >
        <Lightbulb className="w-5 h-5 mr-2" />
        Hipótesis ({hipoLength})
      </TabsTrigger>
      <TabsTrigger
        value={TABS_LIST.TEST}
        className="py-3 text-lg md:text-base md:py-2"
      >
        <FlaskConical className="w-5 h-5 mr-2" />
        Experimentación ({testLength})
      </TabsTrigger>
      <TabsTrigger
        value={TABS_LIST.COMPLETED}
        className="py-3 text-lg md:text-base md:py-2"
      >
        <FileSpreadsheet className="w-5 h-5 mr-2" />
        Resultados ({completeLength})
      </TabsTrigger>
      <TabsTrigger
        value={TABS_LIST.CLOSED}
        className="py-3 text-lg md:text-base md:py-2"
      >
        <FolderArchive className="w-5 h-5 mr-2" />
        Archivados ({closeLength})
      </TabsTrigger>
    </TabsList>
  );
};
