import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import type { FC } from 'react';
import { LayoutPanelLeft, Lightbulb } from 'lucide-react';
import { Icons } from '@/components/icons';
import { ROUTES } from '@/config/routes';
import { useUser } from '@/components/context/AuthContext';
import { getInitials } from '@/lib/get-initials';

interface ProfileDropdownProps {}

export const ProfileDropdown: FC<ProfileDropdownProps> = ({}) => {
  const { user, logout } = useUser();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative w-8 h-8 rounded-full">
          <Avatar className="w-8 h-8">
            <AvatarFallback>{getInitials(user?.name ?? '')}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <span className="block text-sm capitalize">{user?.name}</span>
          <span className="block text-sm font-medium truncate">
            {user?.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={ROUTES.app_hypothesis}>
            <DropdownMenuItem>
              <Lightbulb className="w-4 h-4 mr-2" />
              Hipótesis
            </DropdownMenuItem>
          </Link>
          <Link href={ROUTES.app_dashboard}>
            <DropdownMenuItem>
              <LayoutPanelLeft className="w-4 h-4 mr-2" />
              Panel
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => logout()}>
            <Icons.logout className="w-4 h-4 mr-2" />
            Cerrar Sesión
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
