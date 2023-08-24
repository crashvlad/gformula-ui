import { toast } from '@/components/ui/use-toast';
import { authApi } from '@/lib/auth-api';
import { experimentValidator } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

async function updateTest(data: any) {
  const { id, ...rest } = data;
  const body = { ...rest };

  try {
    const { data } = await authApi.put(`/api/test/${id}`, body);

    return data.data;
  } catch (error) {
    throw new Error(error);
  }
}

export function useUpdateTest() {
  const client = useQueryClient();

  return useMutation(updateTest, {
    onError: () => {
      toast({ title: 'Al parecer algo ha salido mal!' });
    },
    onSuccess: (data) => {
      toast({ title: 'Hipótesis editada!' });
    },
    onSettled: (data) => {
      client.invalidateQueries({ queryKey: ['test', data.id] });
      client.invalidateQueries({ queryKey: ['tests'] });
    },
  });
}
