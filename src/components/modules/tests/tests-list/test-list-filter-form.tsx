import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ROUTES } from '@/config/routes';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';
import { RESULTS_OPTIONS, SALES_PROCESS_IMPACT_OPTIONS } from '@/lib/contants';
import { zodResolver } from '@hookform/resolvers/zod';
import { FilterIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const testEditSchema = z.object({
  resultStatus: z.string(),
  type: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

export const TestListFilterForm = () => {
  const { createQueryString } = useCreateQueryString();
  const router = useRouter();

  const form = useForm<z.infer<typeof testEditSchema>>({
    resolver: zodResolver(testEditSchema),
  });

  async function onSubmit(values: z.infer<typeof testEditSchema>) {}

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="ml-auto">
          Filtros <FilterIcon className="w-4 h-4 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96" align="end">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="resultStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select
                    onValueChange={(e) => {
                      field.onChange(e);

                      router.push(
                        `${router.pathname}?${createQueryString({
                          type: e,
                        })}`
                      );
                    }}
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
              name="resultStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resultado </FormLabel>
                  <Select
                    onValueChange={(e) => {
                      field.onChange(e);

                      router.push(
                        `${router.pathname}?${createQueryString({
                          resultStatus: e,
                        })}`
                      );
                    }}
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

            <div className="grid space-y-8 md:space-y-0 md:gap-5 md:grid-cols-2">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desde</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.target.value);

                          router.push(
                            `${router.pathname}?${createQueryString({
                              startDate: e.target.value,
                            })}`
                          );
                        }}
                        type="date"
                        placeholder=""
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
                    <FormLabel>Hasta</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.target.value);

                          router.push(
                            `${router.pathname}?${createQueryString({
                              endDate: e.target.value,
                            })}`
                          );
                        }}
                        type="date"
                        placeholder=""
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                onClick={(e) => {
                  router.push(ROUTES.app_results);
                }}
              >
                Limpiar Filtros
              </Button>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};
