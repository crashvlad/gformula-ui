import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';

const testEditSchema = z.object({
  description: z.string(),
});

export const FeedbackForm = () => {
  const form = useForm<z.infer<typeof testEditSchema>>({
    resolver: zodResolver(testEditSchema),
  });

  async function onSubmit(values: z.infer<typeof testEditSchema>) {
    toast({ title: 'Feeback enviado' });
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          Feedback
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96" align="end">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Your feedback"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3">
              <Button size="sm">Enviar</Button>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};
