import { toast } from '@/components/ui/use-toast';
import { authApi } from '@/lib/auth-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

async function postComment(formData) {
  const body = { ...formData };

  try {
    const { data } = await authApi.post('/api/comments', body);

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export function useAddComment() {
  const queryClient = useQueryClient();

  const mutation = useMutation(postComment, {
    onError: (error, vars, ctx) => {
      toast({ title: 'Algo salio mal intentalo de nuevo!' });
    },
    onSettled: (newTodo) => {
      const objectiveId = newTodo.data.objectiveId;
      const testId = newTodo.data.testId;
      const metricId = newTodo.data.metricId;

      if (objectiveId) {
        queryClient.invalidateQueries(['comments-objective', objectiveId]);
      }

      if (testId) {
        queryClient.invalidateQueries(['comments-test', testId]);
      }

      if (metricId) {
        queryClient.invalidateQueries(['comments-metric', metricId]);
      }
    },
  });

  return { ...mutation };
}

function getCommentQueryKeys(comment) {
  if (comment.testId) {
    return ['comments-test', comment.testId];
  }
  if (comment.objectiveId) {
    return ['comments-objective', comment.objectiveId];
  }
  if (comment.metricId) {
    return ['comments-metric', comment.metricId];
  }
}
