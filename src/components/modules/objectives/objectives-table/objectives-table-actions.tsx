'use client';

import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { DataTableRowActions } from '@/components/ui/data-table-row-actions';
import { Dialog } from '@/components/ui/dialog';
import { ObjectiveDialogForm } from '../objective-dialog-form';
import { useState } from 'react';
import { Objective } from '@/types';
import {
  AlertDialogHeader,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import Link from 'next/link';
import { ROUTES } from '@/config/routes';

interface ObjectivesTableActionsProps {
  objective: Objective;
}

export function ObjectivesTableActions({
  objective,
}: ObjectivesTableActionsProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <DataTableRowActions>
        <DropdownMenuItem asChild>
          <Link href={ROUTES.app_objectives_detail(objective.id)}>Ver</Link>
        </DropdownMenuItem>
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
        <ObjectiveDialogForm
          afterMutation={() => setOpen(false)}
          objective={objective}
        />
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
              onClick={() => {
                setShowDeleteDialog(false);
                toast({
                  description: 'This preset has been deleted.',
                });
              }}
            >
              Eliminar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
