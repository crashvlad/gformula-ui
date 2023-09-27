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
import { MouseEvent, MouseEventHandler } from 'react';

type DeleteDialogProps = {
  open: boolean;
  loading?: boolean;
  onOpenChange: (value: boolean) => void;
  onClickHandle: MouseEventHandler<HTMLButtonElement>;
};

export function DeleteDialog({
  open,
  onOpenChange,
  loading,
  onClickHandle,
}: DeleteDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
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
            disabled={loading}
            loading={loading}
            onClick={onClickHandle}
          >
            Eliminar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
