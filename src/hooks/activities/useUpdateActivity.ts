import { toast } from '@/components/ui/use-toast';
import { authApi } from '@/lib/auth-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

async function updateActivity(formData) {
  const { id, ...rest } = formData;
  const body = { ...rest };
  try {
    const { data } = await authApi.post(`/api/activities/${id}`, body);

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export function useUpdateActivity() {
  const clientQuery = useQueryClient();

  return useMutation(updateActivity, {
    onError: () => {
      toast({ title: 'Al parecer algo ha salido mal!' });
    },
    onSettled: () =>
      clientQuery.invalidateQueries({ queryKey: ['activities'] }),
  });
}
