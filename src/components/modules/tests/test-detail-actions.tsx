import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ROUTES } from '@/config/routes';
import { Eye, MoreVerticalIcon, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { TestAddDialogForm } from './test-add-dialog-form';
import { useUser } from '@/components/context/AuthContext';
import { useUpdateTest } from '@/hooks/tests';
import { useState } from 'react';
import { Experiment } from '@/types';
import { ACCESS_LEVEL } from '@/lib/contants';

export const TestDetailAction = ({ test }: { test: Experiment }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const { user } = useUser();
  const isOwner = user?.id === test.creator.id;
  const isAdminUser = user?.accessLevel === ACCESS_LEVEL.ACCOUNT_ADMIN;

  const isShowDeleteButton = isOwner || isAdminUser;

  const updateMutation = useUpdateTest();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="data-[state=open]:bg-muted ">
            <MoreVerticalIcon className="w-4 h-4 mr-2" />
            Acciones
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          {isOwner && (
            <>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="flex justify-between"
                  onSelect={() => setIsOpenForm(true)}
                >
                  Editar
                  <Pencil className="w-4 h-4" />
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </>
          )}

          {isShowDeleteButton && (
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="flex justify-between"
                onSelect={() => setShowDeleteDialog(true)}
              >
                Archivar
                <Trash2 className="w-4 h-4" />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <TestAddDialogForm
        open={isOpenForm}
        handleOpenChange={(value) => setIsOpenForm(value)}
        afterMutation={() => setIsOpenForm(false)}
        test={test}
      />

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás completamente seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción solo la puede deshacer un administrador.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <Button
              variant="destructive"
              disabled={updateMutation.isLoading}
              loading={updateMutation.isLoading}
              onClick={() => {
                updateMutation.mutate(
                  { id: test.id, status: 'CLOSED' },
                  {
                    onSuccess: () => {
                      setShowDeleteDialog(false);
                    },
                  }
                );
              }}
            >
              Eliminar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
