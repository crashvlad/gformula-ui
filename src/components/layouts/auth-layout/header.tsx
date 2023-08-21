import { ThemeToggle } from './theme-toggle';
import { ProfileDropdown } from './profile-dropdown';

import { type FC } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { NotificationPopover } from './notification-popover';
import { Settings, Settings2 } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/config/routes';
import { useUser } from '@/components/context/AuthContext';
import { ACCESS_LEVEL } from '@/lib/contants';
import { MobileSidebar } from './mobile-sidebar';

interface DashboardHeaderProps {}

export const Header: FC<DashboardHeaderProps> = ({}) => {
  const { user, logout } = useUser();

  return (
    <div className="sticky top-0 z-30 border-b bg-background backdrop-blur-sm">
      <header className="container flex h-[3.5rem] items-center justify-between">
        <nav className="flex items-center">
          <MobileSidebar />

          <div className="hidden lg:flex">
            <Icons.logo />
          </div>
        </nav>

        <nav className="flex items-center space-x-3">
          <NotificationPopover />
          {user && user.accessLevel === ACCESS_LEVEL.ACCOUNT_ADMIN && (
            <Link
              href={ROUTES.app_settings}
              className={buttonVariants({ variant: 'outline', size: 'sm' })}
            >
              <span className="sr-only">Configuración</span>
              <Settings className="w-5 h-5" />
            </Link>
          )}

          <ThemeToggle />
          <ProfileDropdown />
        </nav>
      </header>
    </div>
  );
};
