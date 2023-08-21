import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
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
import { useUpdateArea, useAddArea } from '@/hooks/areas';

export const areaFormSchema = z.object({
  name: z.string().min(2).max(50),
});

export function AreaDialogForm({
  afterMutation,
  area,
}: {
  area?: any;
  afterMutation: () => void;
}) {
  const mutation = useAddArea();
  const updateMutation = useUpdateArea();

  const form = useForm<z.infer<typeof areaFormSchema>>({
    resolver: zodResolver(areaFormSchema),
    defaultValues: {
      name: area?.name ?? undefined,
    },
  });

  function onSubmit(values: z.infer<typeof areaFormSchema>) {
    if (!area) {
      mutation.mutate(values, {
        onSuccess: () => {
          form.reset();
          afterMutation();
        },
      });
    } else {
      updateMutation.mutate(
        { id: area.id, ...values },
        {
          onSuccess: () => {
            form.reset();
            afterMutation();
          },
        }
      );
    }
  }

  const loading =
    mutation.isLoading ||
    updateMutation.isLoading ||
    form.formState.isSubmitting;

  return (
    <>
      <DialogContent className="sm:max-w-[650px] overflow-y-scroll max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Añadir</DialogTitle>
          <DialogDescription>
            Añade nuevas áreas de trabajo a tu equipo
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3">
              <DialogClose>
                <Button type="button" variant={'outline'}>
                  Cancelar
                </Button>
              </DialogClose>
              <Button disabled={loading} loading={loading} type="submit">
                {area ? 'Editar' : 'Añadir'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </>
  );
}
