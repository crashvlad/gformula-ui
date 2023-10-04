import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

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
import { Textarea } from '@/components/ui/textarea';
import { useContactLead } from '@/hooks/useContactLead';
import { toast } from '@/components/ui/use-toast';
import { CheckCircleIcon } from 'lucide-react';
import { useRouter } from 'next/router';

const FormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  message: z.string(),
});

export function ContactForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const router = useRouter();
  const { mutate, isLoading } = useContactLead();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate(data, {
      onSuccess: () => {
        toast({
          title: (
            <div className="flex items-center gap-4">
              <CheckCircleIcon />
              <span>Gracias por comunicarte con nosotros!</span>
            </div>
          ),
        });

        setTimeout(() => {
          router.push('/');
        }, 1000);
      },
      onError: (error, vars, ctx) => {
        console.error(error);
        toast({
          title: 'Algo salio mal intentalo de nuevo',
          variant: 'destructive',
        });
      },
    });
  }

  const loading = isLoading || form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="px-6 pt-20 pb-24 sm:pb-32 lg:px-8 lg:py-24"
      >
        <div className="max-w-xl mx-auto lg:mr-0 lg:max-w-lg">
          <div className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="sm:col-span-full">
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input className="bg-card" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="sm:col-span-full">
                  <FormLabel>Correo</FormLabel>
                  <FormControl>
                    <Input className="bg-card" type="email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="sm:col-span-full">
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input className="bg-card" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="sm:col-span-full">
                  <FormLabel>Mensage</FormLabel>
                  <FormControl>
                    <Textarea rows={4} className="bg-card" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end mt-8">
            <Button type="submit" loading={loading} disabled={loading}>
              Enviar mensaje
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
