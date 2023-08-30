import { useUser } from '@/components/context/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { useGetCommentsObjective } from '@/hooks';
import { useAddComment } from '@/hooks/comments';
import { getInitials } from '@/lib/get-initials';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const testCommentSchema = z.object({
  description: z.string().min(1),
});

export function ObjectiveComments() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const { user } = useUser();
  const { data: dataComments, isLoading: isLoadingComments } =
    useGetCommentsObjective(Number(id), Boolean(id));

  const addMutation = useAddComment();

  const form = useForm<z.infer<typeof testCommentSchema>>({
    resolver: zodResolver(testCommentSchema),
  });

  function onSubmit(values: z.infer<typeof testCommentSchema>) {
    const variables = {
      content: values.description.trim(),
      objectiveId: Number(id),
    };

    addMutation.mutate(variables, {
      onSuccess: () => {
        form.reset({ description: '' });
      },
    });
  }

  const loading = addMutation.isLoading || form.formState.isSubmitting;

  return (
    <>
      {isLoadingComments && <Skeleton className="h-96" />}

      {!isLoadingComments && dataComments && (
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center border-b">
            <CardTitle>Comentarios</CardTitle>
          </CardHeader>
          <CardContent className="py-4 overflow-hidden overflow-y-auto h-96">
            <div className="space-y-4">
              {dataComments?.map((message: any, index: number) => {
                const isCurrenUserComment = message.creatorId === user?.id;

                return (
                  <div
                    key={index}
                    className={cn(
                      'flex items-start gap-3 w-max max-w-[80%] text-sm',
                      isCurrenUserComment && 'ml-auto '
                    )}
                  >
                    <Avatar>
                      <AvatarFallback>
                        {getInitials(message.creator.name)}
                      </AvatarFallback>
                    </Avatar>

                    <div
                      className={cn(
                        'rounded-lg px-3 py-2 ',
                        isCurrenUserComment
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      )}
                    >
                      <span className="font-medium">
                        {message.creator.name}:{' '}
                      </span>
                      {message.content}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
          <CardFooter className="py-4 mt-auto border-t">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex items-end w-full space-x-2"
              >
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Textarea rows={4} {...field} placeholder="" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="icon"
                  loading={loading}
                  disabled={loading}
                >
                  <Send className="w-4 h-4" />
                  <span className="sr-only">Enviar</span>
                </Button>
              </form>
            </Form>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
