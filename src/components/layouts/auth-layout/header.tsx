import { ProfileDropdown } from './profile-dropdown';

import { type FC } from 'react';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { NotificationPopover } from './notification-popover';
import { HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/config/routes';
import { useUser } from '@/components/context/AuthContext';
import { MobileSidebar } from './mobile-sidebar';
import { FeedbackForm } from './feedback-form';

interface DashboardHeaderProps {}

export const Header: FC<DashboardHeaderProps> = ({}) => {
  return (
    <div className="sticky top-0 z-30 border-b bg-background backdrop-blur-sm">
      <header className="px-6 flex h-[3.5rem] items-center justify-between">
        <nav className="flex items-center">
          <MobileSidebar />

          <Link href={ROUTES.app_home} className="hidden lg:flex">
            <Icons.logo />
          </Link>
        </nav>

        <nav className="flex items-center space-x-3">
          <FeedbackForm />
          <Link
            className={buttonVariants({ variant: 'outline', size: 'sm' })}
            href={ROUTES.faq}
          >
            <HelpCircle />
          </Link>
          <NotificationPopover />
          <ProfileDropdown />
        </nav>
      </header>
    </div>
  );
};
