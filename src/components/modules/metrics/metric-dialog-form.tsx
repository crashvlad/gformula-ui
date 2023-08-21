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
import { Textarea } from '@/components/ui/textarea';
import { useAddMetric, useUpdateMetric } from '@/hooks/metrics';
import { useEffect, useMemo } from 'react';

export const metricFormSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
});

export function MetricDialogForm({
  afterMutation,
  metric,
}: {
  metric?: any;
  afterMutation: () => void;
}) {
  const defaultValues = useMemo(() => {
    const values = {
      name: metric?.name ?? undefined,
      description: metric?.description ?? undefined,
    };

    return values;
  }, [metric]);

  const form = useForm<z.infer<typeof metricFormSchema>>({
    resolver: zodResolver(metricFormSchema),
    defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  const addMutation = useAddMetric();
  const updateMutation = useUpdateMetric();

  function onSubmit(values: z.infer<typeof metricFormSchema>) {
    if (!metric) {
      addMutation.mutate(values, {
        onSuccess: () => {
          afterMutation();
          form.reset({ name: '', description: '' });
        },
      });
    } else {
      updateMutation.mutate(
        { id: metric.id, ...values },
        {
          onSuccess: () => {
            afterMutation();
            form.reset({});
          },
        }
      );
    }
  }

  const loading =
    form.formState.isSubmitting ||
    addMutation.isLoading ||
    updateMutation.isLoading;

  return (
    <>
      <DialogContent className="sm:max-w-[650px] overflow-y-scroll max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Añadir</DialogTitle>
          <DialogDescription>Añade nuevas métricas</DialogDescription>
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
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Como va ayudar esta métrica en el negocio?
                  </FormLabel>
                  <FormControl>
                    <Textarea rows={4} {...field} placeholder="" />
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
                {metric ? 'Editar' : 'Añadir'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </>
  );
}
