import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { FlaskConical } from 'lucide-react';
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

export const testEditSchema = z.object({
  endDate: z.string(),
});

export function TestExperimentationDialogForm({ id }: { id: string }) {
  const form = useForm<z.infer<typeof testEditSchema>>({
    resolver: zodResolver(testEditSchema),
  });

  const updateMutation = useUpdateTest();

  async function onSubmit(values: z.infer<typeof testEditSchema>) {
    await updateMutation.mutateAsync({
      id: id,
      endDate: values.endDate,
      status: 'TEST',
    });
  }

  const loading = form.formState.isSubmitting || updateMutation.isLoading;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="ml-auto">
          Comenzar Experimentación <FlaskConical className="w-4 h-4 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de caducidad</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" placeholder="" />
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
