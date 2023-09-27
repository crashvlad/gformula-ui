import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { User } from '@/types';
import * as z from 'zod';

export const useFormUpdateSchema = z.object({
  password: z.string().min(2).max(50),
});

export function UserUpdatePassword({
  afterMutation,
  user,
}: {
  user?: User;
  afterMutation: () => void;
}) {
  const form = useForm<z.infer<typeof useFormUpdateSchema>>({
    resolver: zodResolver(useFormUpdateSchema),
    defaultValues: { password: '' },
  });

  function onSubmitUpdate(values: z.infer<typeof useFormUpdateSchema>) {
    // updateMutation.mutate(
    //   { ...values, id: user?.id },
    //   {
    //     onSuccess: () => {
    //       afterMutation();
    //       form.reset();
    //     },
    //   }
    // );
  }

  const loading = form.formState.isSubmitting;

  return (
    <>
      <DialogContent className="sm:max-w-md overflow-y-scroll max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Actualizar contraseña de {user.name}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              onSubmitUpdate(data);
            })}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña nueva</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3">
              <DialogClose asChild>
                <Button type="button" variant={'outline'}>
                  Cancelar
                </Button>
              </DialogClose>
              <Button disabled={loading} loading={loading} type="submit">
                Actualizar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </>
  );
}
