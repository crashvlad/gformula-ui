import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import * as z from 'zod';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SALES_PROCESS_IMPACT_OPTIONS } from '@/lib/contants';
import { useGetAreas } from '@/hooks/areas';
import { useGetObjectives } from '@/hooks';
import { Textarea } from '@/components/ui/textarea';
import { useAddTest, useUpdateTest } from '@/hooks/tests';
import { Experiment } from '@/types';

export const testAddForm = z.object({
  name: z
    .string({ required_error: 'Este campo es obligatorio' })
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    .max(50, { message: 'El nombre no debe exceder los 50 caracteres' }),
  description: z
    .string({ required_error: 'Este campo es obligatorio' })
    .min(10, { message: 'La descripción debe tener al menos 10 caracteres' }),
  objectiveId: z.string({ required_error: 'Selecciona un objetivo válido' }),
  targetArea: z.string({ required_error: 'Selecciona un área válida' }),
  type: z.string({ required_error: 'Este campo es obligatorio' }),
  impact: z.coerce
    .number({
      required_error: 'Este campo es obligatorio',
      invalid_type_error: 'Este campo es obligatorio',
    })
    .positive({ message: 'El valor debe ser positivo' })
    .max(10, { message: 'El valor no debe exceder 10' }),
  confidence: z.coerce
    .number({
      required_error: 'Este campo es obligatorio',
      invalid_type_error: 'Este campo es obligatorio',
    })
    .positive({ message: 'El valor debe ser positivo' })
    .max(10, { message: 'El valor no debe exceder 10' }),
  difficulty: z.coerce
    .number({
      required_error: 'Este campo es obligatorio',
      invalid_type_error: 'Este campo es obligatorio',
    })
    .positive({ message: 'El valor debe ser positivo' })
    .max(10, { message: 'El valor no debe exceder 10' }),
});

export function TestAddDialogForm({
  open,
  test,
  handleOpenChange,
  afterMutation,
}: {
  test?: Experiment;
  open: boolean;
  handleOpenChange: (value: boolean) => void;
  afterMutation: () => void;
}) {
  const addMutation = useAddTest();
  const updateMutation = useUpdateTest();

  const { areasOptions } = useGetAreas();
  const { optionsObjectives } = useGetObjectives();

  const form = useForm<z.infer<typeof testAddForm>>({
    resolver: zodResolver(testAddForm),
    defaultValues: test
      ? {
          name: test?.name ?? '',
          description: test?.description ?? '',
          objectiveId: test?.objectiveId.toString() ?? '',
          targetArea: test?.targetArea ?? '',
          type: test?.type ?? '',
          impact: test?.impact,
          confidence: test?.confidence,
          difficulty: test?.difficulty,
        }
      : {},
  });

  async function onSubmit(values: z.infer<typeof testAddForm>) {
    const payload = {
      ...values,
      objectiveId: Number(values.objectiveId),
    };

    if (test) {
      await updateMutation.mutateAsync(
        { id: test.id, ...payload },
        {
          onSuccess: () => afterMutation(),
        }
      );
    } else {
      await addMutation.mutateAsync(payload, {
        onSuccess: () => afterMutation(),
      });
    }
  }

  const loading = form.formState.isSubmitting || addMutation.isLoading;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[800px] overflow-y-scroll max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Crear nueva Hipótesis</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="md:max-w-sm">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="" />
                    </FormControl>

                    <FormDescription>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Qui quis officiis labore cupiditate, aspernatur amet?
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid space-y-8 md:space-y-0 md:gap-5 md:grid-cols-3">
              <FormField
                control={form.control}
                name="objectiveId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>¿Que objetivo impactará?</FormLabel>
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
                        {optionsObjectives.map((s) => (
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
                name="targetArea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>¿Que área de trabajo impactará?</FormLabel>
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
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Área de Impacto</FormLabel>
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
            </div>

            <div className="grid space-y-8 md:space-y-0 md:gap-5 md:grid-cols-3">
              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dificultad</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="impact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Impacto</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confidence"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confianza</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={5} placeholder="" />
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
                {test ? 'Editar' : 'Añadir'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
