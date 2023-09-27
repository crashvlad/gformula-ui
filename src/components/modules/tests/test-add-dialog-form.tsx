import { Button } from '@/components/ui/button';
import {
  Dialog,
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
  FormTooltipInfo,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ROUTES } from '@/config/routes';
import { useGetObjectives } from '@/hooks';
import { useGetAreas } from '@/hooks/areas';
import { useAddTest, useUpdateTest } from '@/hooks/tests';
import { SALES_PROCESS_IMPACT_OPTIONS } from '@/lib/contants';
import { Experiment } from '@/types';
import { useRouter } from 'next/router';
import * as z from 'zod';
import { TABS_LIST } from '.';

const testAddForm = z.object({
  name: z
    .string({ required_error: 'Este campo es obligatorio' })
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
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
  const router = useRouter();

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
        onSuccess: () => {
          router.push(`${ROUTES.app_hypothesis}?tab=${TABS_LIST.IDEA}`);
          afterMutation();
        },
      });
    }
  }

  const loading = form.formState.isSubmitting || addMutation.isLoading;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
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
                    <FormLabel className="flex items-end gap-3">
                      Nombre
                      <FormTooltipInfo />
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="" />
                    </FormControl>

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
                    <FormLabel className="flex items-end gap-3">
                      ¿Que objetivo impactará?{' '}
                      <FormTooltipInfo description="Seleccion a que objetivo afectara esta hipotesis" />
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
                    <FormLabel className="flex items-end gap-3">
                      ¿Que área de trabajo impactará? <FormTooltipInfo />
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
                    <FormLabel className="flex items-end gap-3">
                      Área de Impacto <FormTooltipInfo />
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
            </div>

            <div className="grid space-y-8 md:space-y-0 md:gap-5 md:grid-cols-3">
              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-end gap-3">
                      Dificultad <FormTooltipInfo />
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        inputMode="numeric"
                        onChange={(e) => {
                          const value = e.target.valueAsNumber;

                          if (value > 10) {
                            e.target.valueAsNumber = 0;
                          }

                          field.onChange(e);
                        }}
                      />
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
                    <FormLabel className="flex items-end gap-3">
                      Impacto <FormTooltipInfo />
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        inputMode="numeric"
                        onChange={(e) => {
                          const value = e.target.valueAsNumber;

                          if (value > 10) {
                            e.target.valueAsNumber = 0;
                          }

                          field.onChange(e);
                        }}
                      />
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
                    <FormLabel className="flex items-end gap-3">
                      Confianza <FormTooltipInfo />
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        inputMode="numeric"
                        onChange={(e) => {
                          const value = e.target.valueAsNumber;

                          if (value > 10) {
                            e.target.valueAsNumber = 0;
                          }

                          field.onChange(e);
                        }}
                      />
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
                  <FormLabel className="flex items-end gap-3">
                    Descripción <FormTooltipInfo />
                  </FormLabel>
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
