import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Plus } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useUpdateTest } from '@/hooks/tests';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RESULTS_OPTIONS } from '@/lib/contants';

const testEditSchema = z.object({
  results: z.string(),
  resultStatus: z.string(),
});

export function TestResultDialogForm({ id }: { id: string }) {
  const form = useForm<z.infer<typeof testEditSchema>>({
    resolver: zodResolver(testEditSchema),
  });

  const updateMutation = useUpdateTest();

  async function onSubmit(values: z.infer<typeof testEditSchema>) {
    await updateMutation.mutateAsync({
      id: id,
      results: values.results,
      resultStatus: values.resultStatus,
      status: 'COMPLETED',
    });
  }

  const loading = form.formState.isSubmitting || updateMutation.isLoading;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="ml-auto">
          Añadir Resultados <Plus className="w-4 h-4 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="resultStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resultado</FormLabel>
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
                      {RESULTS_OPTIONS.map((s) => (
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
              name="results"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detalles del resultado</FormLabel>
                  <FormControl>
                    <Textarea rows={4} {...field} placeholder="" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3">
              <Button disabled={loading} loading={loading} type="submit">
                Guardar
              </Button>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
