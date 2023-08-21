'use client';

import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { DataTableRowActions } from '@/components/ui/data-table-row-actions';
import { Dialog } from '@/components/ui/dialog';
import { useState } from 'react';
import {
  AlertDialogHeader,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { User } from '@/types';
import { UserDialogForm } from '../user-dialog-form';

interface UserTableActionsProps {
  user: User;
}

export function UserTableActions({ user }: UserTableActionsProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <DataTableRowActions>
        <DropdownMenuItem onSelect={() => setOpen(true)}>
          Editar
        </DropdownMenuItem>

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

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás completamente seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <Button
              variant="destructive"
              // disabled={removeMutation.isLoading}
              // loading={removeMutation.isLoading}
              // onClick={() => {
              //   removeMutation.mutate(user.id, {
              //     onSuccess: () => {
              //       setShowDeleteDialog(false);
              //     },
              //   });
              // }}
            >
              Eliminar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
