import { useUser } from '@/components/context/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Skeleton } from '@/components/ui/skeleton';
import { useGetCommentsObjective } from '@/hooks';
import { getInitials } from '@/lib/get-initials';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { ObjectiveCommentsForm } from './objective-comments-form';
import showComment from '@/lib/show-comment';

export const testCommentSchema = z.object({
  description: z.string().min(1),
});

export function ObjectiveComments() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const { user } = useUser();
  const { data: dataComments, isLoading: isLoadingComments } =
    useGetCommentsObjective(Number(id), Boolean(id));

  return (
    <>
      {isLoadingComments && <Skeleton className="h-96" />}

      {!isLoadingComments && dataComments && (
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center border-b">
            <CardTitle>Comentarios</CardTitle>
          </CardHeader>
          <CardContent className="py-4 overflow-hidden overflow-y-auto max-h-60">
            <div className="space-y-4">
              {dataComments.length === 0 && (
                <div className="flex items-center justify-center h-32 text-lg text-center">
                  No hay comentarios
                </div>
              )}
              {dataComments?.map((comment: any) => (
                <ObjectiveComment key={comment.id} comment={comment} />
              ))}
            </div>
          </CardContent>
          <CardFooter className="py-4 mt-auto border-t">
            <ObjectiveCommentsForm />
          </CardFooter>
        </Card>
      )}
    </>
  );
}

function ObjectiveComment({ comment }: { comment: any }) {
  const { user } = useUser();
  const isCurrenUserComment = comment.creatorId === user?.id;

  return (
    <div
      className={cn(
        'flex gap-3 w-max max-w-[80%] text-sm',
        isCurrenUserComment && 'ml-auto '
      )}
    >
      <Avatar>
        <AvatarFallback>{getInitials(comment.creator.name)}</AvatarFallback>
      </Avatar>

      <div
        className={cn(
          'rounded-lg px-3 py-2 ',
          isCurrenUserComment
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted'
        )}
      >
        <span className="font-medium">{comment.creator.name}: </span>
        {showComment(comment.content)}
      </div>
    </div>
  );
}
