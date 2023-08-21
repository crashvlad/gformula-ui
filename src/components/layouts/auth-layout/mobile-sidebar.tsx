/* eslint-disable @next/next/no-img-element */
import { Dialog, Transition } from '@headlessui/react';
import { FC, Fragment } from 'react';
import { SidebarItem } from './sidebar-item';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

import { sidebarConfig } from '@/config/sidebar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface MobileSidebarProps {}

export const MobileSidebar: FC<MobileSidebarProps> = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className="lg:hidden">
        <Button variant={'ghost'} type="button" size="sm">
          <span className="sr-only">Open sidebar</span>
          <Icons.menu className="w-6 h-6" aria-hidden="true" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-56">
        <div className="h-full">
          <aside className="flex-col mt-4 space-y-1">
            {sidebarConfig.map((c) => (
              <SidebarItem
                key={c.path}
                path={c.path}
                icon={c.icon}
                title={c.title}
              />
            ))}
          </aside>
        </div>
      </SheetContent>
    </Sheet>
  );
};
