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
import { useAddObjective, useUpdateObjective } from '@/hooks';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SALES_PROCESS_IMPACT_OPTIONS } from '@/lib/contants';
import { Objective } from '@/types';
import { useGetMetrics } from '@/hooks/metrics';

export const objectiveFormSchema = z.object({
  name: z.string().min(2).max(50),
  type: z.string().min(5),
  description: z.string().min(10),
  metricId: z.string().optional(),
  endDate: z.string().optional(),
});

export function ObjectiveDialogForm({
  afterMutation,
  objective,
}: {
  objective?: Objective;
  afterMutation: () => void;
}) {
  const mutation = useAddObjective();
  const mutationUpdate = useUpdateObjective();
  const { metricsOptions } = useGetMetrics();

  const form = useForm<z.infer<typeof objectiveFormSchema>>({
    resolver: zodResolver(objectiveFormSchema),
    defaultValues: {
      name: objective?.name ?? '',
      type: objective?.type ?? '',
      description: objective?.description ?? '',
      endDate: objective?.endDate ?? '',
      metricId: objective?.metricId?.toString() ?? '',
    },
  });

  function onSubmit(values: z.infer<typeof objectiveFormSchema>) {
    const { metricId, ...rest } = values;

    const payload: any = {
      ...rest,
    };

    if (metricId) {
      payload.metricId = Number(metricId);
    }

    if (objective) {
      mutationUpdate.mutate(
        { ...payload, id: objective.id },
        { onSuccess: () => afterMutation() }
      );
    } else {
      mutation.mutate(payload, { onSuccess: () => afterMutation() });
    }
  }

  return (
    <>
      <DialogContent className="sm:max-w-[600px] overflow-y-scroll max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Añadir Objetivo</DialogTitle>
          <DialogDescription>Añade nuevos objetivos</DialogDescription>
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
                    <Input
                      {...field}
                      placeholder="Escriba el nombre de su objetivo"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cuando la queremos cumplir?</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
                      placeholder="Escriba el nombre de su objetivo"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="metricId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>A que métrica impactara?</FormLabel>
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
                      {metricsOptions.map((s: any) => (
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
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Que parte del proceso de venta impactara?
                  </FormLabel>
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
                      {SALES_PROCESS_IMPACT_OPTIONS.map((s) => (
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Describa su objetivo</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={6}
                      placeholder="Escriba una descripción"
                    />
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
              <Button
                disabled={mutation.isLoading || mutationUpdate.isLoading}
                loading={mutation.isLoading || mutationUpdate.isLoading}
                type="submit"
              >
                {objective ? 'Editar' : 'Añadir'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </>
  );
}
