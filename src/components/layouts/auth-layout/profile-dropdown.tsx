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
import { LayoutPanelLeft, Lightbulb, Settings, UserIcon } from 'lucide-react';
import { Icons } from '@/components/icons';
import { ROUTES } from '@/config/routes';
import { useUser } from '@/components/context/AuthContext';
import { getInitials } from '@/lib/get-initials';
import { ACCESS_LEVEL } from '@/lib/contants';

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
          <Link href={ROUTES.profile}>
            <DropdownMenuItem>
              <UserIcon className="w-4 h-4 mr-2" />
              Ver Perfil
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
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
          {user && user.accessLevel === ACCESS_LEVEL.ACCOUNT_ADMIN && (
            <Link href={ROUTES.app_settings}>
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Configuración
              </DropdownMenuItem>
            </Link>
          )}
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
