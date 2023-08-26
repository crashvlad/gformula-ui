import Link from 'next/link';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

import { Icon as LucideIcon } from 'lucide-react';

export interface IListemItem {
  path: string;
  icon: LucideIcon;
  title: string;
  requires?: string[];
}

export function SidebarItem({ path, title, icon: Icon }: IListemItem) {
  const pathname = usePathname();

  const active = pathname === path;

  return (
    <Link
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'hover:bg-primary/50',
        active && 'bg-primary/50 hover:bg-primary/50',
        'w-full justify-start'
      )}
      href={path}
    >
      {/* @ts-ignore */}
      <Icon className="w-6 h-6 mr-4" />
      {title}
    </Link>
  );
}
