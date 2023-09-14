import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function useTabsRouteState({ defaultValue }: { defaultValue: string }) {
  const router = useRouter();

  const defaultTab = router.query.tab as string;
  const [activeTab, setActiveTab] = useState<string>(
    defaultTab || defaultValue
  );

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    router.push({ query: { tab: value } });
  };

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  return { activeTab, handleTabChange };
}
