import { toast } from '@/components/ui/use-toast';
import { authApi } from '@/lib/auth-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

async function updateVote(data) {
  const { id, ...input } = data;

  const body = { ...input };

  try {
    const { data } = await authApi.put(`/api/votes/${id}`, body);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export function useUpdateVote() {
  const client = useQueryClient();

  return useMutation(updateVote, {
    onError: () => {
      toast({ title: 'Algo ha salido mal intentalo de nuevo.' });
    },
    onSuccess: (data) => {},
  });
}
