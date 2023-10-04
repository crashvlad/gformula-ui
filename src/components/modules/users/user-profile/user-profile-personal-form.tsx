import { useUser } from '@/components/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { toast } from '@/components/ui/use-toast';
import { useUpdateUser } from '@/hooks/users';
import { getInitials } from '@/lib/get-initials';
import { User } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  targetArea: z.string().optional(),
  accessLevel: z.string().optional(),
  job: z.string().optional(),
});

export const UserProfilePersonalForm = () => {
  const { user } = useUser();
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
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues,
  });

  const { mutate, isLoading } = useUpdateUser();

  useEffect(() => {
    form.reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { targetArea, accessLevel, ...restValues } = data;

    mutate({ id: user?.id, ...restValues });
  }

  return (
    <Form {...form}>
      <form className="md:col-span-2" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
          <div className="flex items-center col-span-full gap-x-8">
            <Avatar className="w-16 h-16">
              <AvatarImage src="" alt="@shadcn" />
              <AvatarFallback>{getInitials(user?.name ?? '')}</AvatarFallback>
            </Avatar>
            <div>
              <Button type="button" variant="secondary">
                Cambiar Foto
              </Button>
              <p className="mt-2 text-xs leading-5 text-gray-400">
                JPG, GIF or PNG. 1MB max.
              </p>
            </div>
          </div>
          <div className="col-span-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Completo</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-card" autoComplete="off" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      className="bg-card"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-full">
            <FormField
              control={form.control}
              name="job"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Puesto de tabajo</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-card" autoComplete="off" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-3">
            <FormField
              control={form.control}
              name="targetArea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Área de trabajo</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled
                      className="bg-card"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-3">
            <FormField
              control={form.control}
              name="accessLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rol</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled
                      className="bg-card"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex mt-8">
          <Button
            disabled={isLoading || form.formState.isSubmitting}
            loading={isLoading || form.formState.isSubmitting}
            type="submit"
          >
            Guardar
          </Button>
        </div>
      </form>
    </Form>
  );
};
