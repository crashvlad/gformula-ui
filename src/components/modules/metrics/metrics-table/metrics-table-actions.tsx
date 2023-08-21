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

import { MetricDialogForm } from '../metric-dialog-form';
import Link from 'next/link';
import { ROUTES } from '@/config/routes';
import { Metric } from '@/types';

interface MetricsTableActionsProps {
  metric: Metric;
}

export function MetricsTableActions({ metric }: MetricsTableActionsProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <DataTableRowActions>
        <DropdownMenuItem asChild>
          <Link href={ROUTES.app_metric_detail(metric.id)}>Ver</Link>
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
        <MetricDialogForm
          afterMutation={() => setOpen(false)}
          metric={metric}
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
            {/* <Button
              variant="destructive"
              disabled={removeMutation.isLoading}
              loading={removeMutation.isLoading}
              onClick={() => {
                removeMutation.mutate(metric.id, {
                  onSuccess: () => {
                    setShowDeleteDialog(false);
                  },
                });
              }}
            >
              Eliminar
            </Button> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
