import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import * as z from 'zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { User } from '@/types';
import { useGetAreas } from '@/hooks/areas';
import { useAddUser, useUpdateUser } from '@/hooks/users';
import { USER_ACCESS_LEVEL_OPTIONS } from '@/lib/contants';
import { useEffect, useMemo } from 'react';

export const userFormSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(5),
  targetArea: z.string(),
  accessLevel: z.string(),
  job: z.string(),
});
export const useFormUpdateSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  targetArea: z.string(),
  accessLevel: z.string(),
  job: z.string(),
});

export function UserDialogForm({
  afterMutation,
  user,
}: {
  user?: User;
  afterMutation: () => void;
}) {
  const defaultValues = useMemo(() => {
    const values = {
      name: user?.name ?? '',
      email: user?.email ?? '',
      targetArea: user?.targetArea ?? '',
      job: user?.job ?? '',
      accessLevel: user?.accessLevel ?? '',
    };

    return values;
  }, [user]);

  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(user ? useFormUpdateSchema : userFormSchema),
    defaultValues,
  });

  const { areasOptions } = useGetAreas();
  const addMutation = useAddUser();
  const updateMutation = useUpdateUser();

  useEffect(() => {
    form.reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  function onSubmitCreate(values: z.infer<typeof userFormSchema>) {
    addMutation.mutate(values, {
      onSuccess: () => {
        afterMutation();
        form.reset();
      },
    });
  }
  function onSubmitUpdate(values: z.infer<typeof useFormUpdateSchema>) {
    updateMutation.mutate(
      { ...values, id: user?.id },
      {
        onSuccess: () => {
          afterMutation();
          form.reset();
        },
      }
    );
  }

  const loading =
    addMutation.isLoading ||
    updateMutation.isLoading ||
    form.formState.isSubmitting;

  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añadir Usuario</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              if (user) {
                onSubmitUpdate(data);
              } else {
                onSubmitCreate(data);
              }
            })}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Escriba el nombre de su objetivo"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid space-y-8 md:space-y-0 md:gap-5 md:grid-cols-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="job"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Puesto de trabajo</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {!user && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="grid space-y-8 md:space-y-0 md:gap-5 md:grid-cols-2">
              <FormField
                control={form.control}
                name="targetArea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Área de trabajo</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una opción" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {areasOptions.map((s) => (
                          <SelectItem value={s.value} key={s.id}>
                            {s.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accessLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rol</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una opción" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {USER_ACCESS_LEVEL_OPTIONS.map((s) => (
                          <SelectItem value={s.value} key={s.id}>
                            {s.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-3">
              <DialogClose asChild>
                <Button type="button" variant={'outline'}>
                  Cancelar
                </Button>
              </DialogClose>
              <Button disabled={loading} loading={loading} type="submit">
                {user ? 'Editar' : 'Añadir'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </>
  );
}
