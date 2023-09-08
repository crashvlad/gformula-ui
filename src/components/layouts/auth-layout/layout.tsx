import { PropsWithChildren } from 'react';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { AuthProvider } from '@/components/context/AuthContext';
import { useOnboardingTour } from '@/hooks';
import { SupportPopover } from './support-popover';

interface LayoutProps extends PropsWithChildren {}

export function Layout({ children }: LayoutProps) {
  useOnboardingTour();

  return (
    <AuthProvider>
      <div className="relative flex flex-col">
        <Header />

        <div className="flex h-full overflow-hidden bg-background lg:min-h-[calc(100vh-3.5rem)]">
          <Sidebar />
          <main className="flex-1 h-full px-6 py-3 overflow-hidden overflow-y-auto lg:ml-56">
            {children}
          </main>
        </div>

        <div className="fixed flex flex-col bottom-5 right-6">
          <SupportPopover />
        </div>
      </div>
    </AuthProvider>
  );
}
