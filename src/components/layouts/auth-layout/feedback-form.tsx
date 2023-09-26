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
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useAddFeedback } from '@/hooks/support/useAddFeedback';
import { useState } from 'react';

const testEditSchema = z.object({
  content: z.string(),
});

export const FeedbackForm = () => {
  const { mutate, isLoading } = useAddFeedback();
  const form = useForm<z.infer<typeof testEditSchema>>({
    resolver: zodResolver(testEditSchema),
  });

  async function onSubmit(values: z.infer<typeof testEditSchema>) {
    mutate(
      { content: values.content },
      {
        onSuccess: () => {
          form.reset({ content: '' });
        },
      }
    );
  }

  const loading = isLoading || form.formState.isSubmitting;

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
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Déjanos tu feedback"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3">
              <Button loading={loading} disabled={loading} size="sm">
                Enviar
              </Button>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};
