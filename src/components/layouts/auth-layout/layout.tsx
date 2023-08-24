import { PropsWithChildren } from 'react';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { useDisclosure } from '@mantine/hooks';
import { MobileSidebar } from './mobile-sidebar';
import { AuthProvider } from '@/components/context/AuthContext';

interface LayoutProps extends PropsWithChildren {}

export function Layout({ children }: LayoutProps) {
  return (
    <AuthProvider>
      <div className="flex flex-col">
        <Header />

        <div className="flex h-full overflow-hidden bg-background lg:min-h-[calc(100vh-3.5rem)]">
          <Sidebar />
          <main className="flex-1 h-full px-6 py-3 overflow-hidden overflow-y-auto lg:ml-56">
            {children}
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
