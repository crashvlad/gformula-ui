import { useUser } from '@/components/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { useGetCommentsObjective } from '@/hooks';
import { cn } from '@/lib/utils';
import { Send } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export function ObjectiveComments() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const { user } = useUser();
  const { data: dataComments, isLoading: isLoadingComments } =
    useGetCommentsObjective(Number(id));

  return (
    <>
      {isLoadingComments && <Skeleton className="h-96" />}

      {!isLoadingComments && dataComments && (
        <Card className="min-h-[310px] flex flex-col">
          <CardHeader className="flex flex-row items-center">
            <CardTitle>Comentarios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dataComments?.map((message: any, index: number) => (
                <div
                  key={index}
                  className={cn(
                    'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm',
                    message.creatorId === user?.id
                      ? 'ml-auto bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )}
                >
                  {message.content}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="mt-auto">
            <form
              onSubmit={(event) => {
                event.preventDefault();

                event.currentTarget.message.value = '';
              }}
              className="flex w-full space-x-2"
            >
              <Textarea
                id="message"
                rows={2}
                placeholder="Escribe un comentario..."
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="w-4 h-4" />
                <span className="sr-only">Enviar</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
