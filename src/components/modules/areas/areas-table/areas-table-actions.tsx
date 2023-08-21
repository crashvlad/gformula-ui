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
import { AreaDialogForm } from '../area-dialog-form';
import { useRemoveArea } from '@/hooks/areas';

interface AreaTableActionsProps {
  area: any;
}

export function AreaTableActions({ area }: AreaTableActionsProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const removeMutation = useRemoveArea();

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
        <AreaDialogForm afterMutation={() => setOpen(false)} area={area} />
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
              disabled={removeMutation.isLoading}
              loading={removeMutation.isLoading}
              onClick={() => {
                removeMutation.mutate(area.id, {
                  onSuccess: () => {
                    setShowDeleteDialog(false);
                  },
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
