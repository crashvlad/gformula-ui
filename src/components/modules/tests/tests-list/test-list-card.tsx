import { useUser } from '@/components/context/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { ROUTES } from '@/config/routes';
import { getFormatDateDistance } from '@/lib/date';
import { Experiment } from '@/types';
import {
  CalendarDays,
  Eye,
  MoreVerticalIcon,
  Pencil,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { TestAddDialogForm } from '../test-add-dialog-form';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useUpdateTest } from '@/hooks/tests';
import { SALES_PROCESS_IMPACT_DICTIONARY } from '@/lib/contants';

export const TestListCard = ({ test }: { test: Experiment }) => {
  const { user } = useUser();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const isOwner = user?.id === test.creator.id;

  const updateMutation = useUpdateTest();

  return (
    <Card className="flex flex-col h-full px-0">
      <CardHeader>
        <CardTitle className="line-clamp-1">{test.name}</CardTitle>
        <CardDescription>
          Creado por {test.creator.name}
          <br />
          <span className="flex gap-2 mt-2">
            <CalendarDays className="w-4 h-4" />
            hace {getFormatDateDistance(test.createdAt)}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <p className="line-clamp-3">{test.description}</p>
      </CardContent>

      <CardFooter className="flex justify-between mt-auto">
        <Badge variant="outline">
          {SALES_PROCESS_IMPACT_DICTIONARY[test.type]}
        </Badge>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <MoreVerticalIcon className="w-4 h-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuGroup>
              <DropdownMenuItem className="flex justify-between" asChild>
                <Link href={ROUTES.app_hypothesis_detail(test.id)}>
                  Ver
                  <Eye className="w-4 h-4" />
                </Link>
              </DropdownMenuItem>
              {isOwner && (
                <DropdownMenuItem
                  className="flex justify-between"
                  onSelect={() => setIsOpenForm(true)}
                >
                  Editar
                  <Pencil className="w-4 h-4" />
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
            {isOwner && (
              <>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="flex justify-between"
                    onSelect={() => setShowDeleteDialog(true)}
                  >
                    Archivar
                    <Trash2 className="w-4 h-4" />
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </>
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
      </CardFooter>
    </Card>
  );
};
