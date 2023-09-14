import { TabsContent } from '@/components/ui/tabs';
import { TestsList } from './tests-list/tests-list';
import { TABS_LIST } from '.';

export const TestsListTabsContent = () => {
  return (
    <>
      <TabsContent value={TABS_LIST.IDEA}>
        <TestsList status={'IDEA'} />
      </TabsContent>
      <TabsContent value={TABS_LIST.TEST}>
        <TestsList status={'TEST'} />
      </TabsContent>
      <TabsContent value={TABS_LIST.COMPLETED}>
        <TestsList status={'COMPLETED'} />
      </TabsContent>
      <TabsContent value={TABS_LIST.CLOSED}>
        <TestsList status={'CLOSED'} />
      </TabsContent>
    </>
  );
};
