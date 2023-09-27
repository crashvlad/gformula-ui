'use client';

import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { DataTableRowActions } from '@/components/ui/data-table-row-actions';
import { Dialog } from '@/components/ui/dialog';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { User } from '@/types';
import { UserDialogForm } from '../user-dialog-form';
import { DeleteDialog } from '@/components/ui/delete-dialog';
import { UserUpdatePassword } from '../user-update-password';
import { ACCESS_LEVEL } from '@/lib/contants';

interface UserTableActionsProps {
  user: User;
}

export function UserTableActions({ user }: UserTableActionsProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [openPassword, setOpenPassword] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <DataTableRowActions>
        <DropdownMenuItem onSelect={() => setOpen(true)}>
          Editar
        </DropdownMenuItem>

        {user.accessLevel === ACCESS_LEVEL.ACCOUNT_EDITOR && (
          <DropdownMenuItem onSelect={() => setOpenPassword(true)}>
            Editar Contraseña
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={() => setShowDeleteDialog(true)}
          className="text-red-600"
        >
          Eliminar
        </DropdownMenuItem>
      </DataTableRowActions>

      <Dialog open={open} onOpenChange={setOpen}>
        <UserDialogForm afterMutation={() => setOpen(false)} user={user} />
      </Dialog>

      <Dialog open={openPassword} onOpenChange={setOpenPassword}>
        <UserUpdatePassword
          afterMutation={() => setOpenPassword(false)}
          user={user}
        />
      </Dialog>

      <DeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onClickHandle={() => {}}
      />
    </>
  );
}
