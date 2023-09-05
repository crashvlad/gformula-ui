import { toast } from '@/components/ui/use-toast';
import { authApi } from '@/lib/auth-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

async function removeArea(id: string) {
  try {
    const { data } = await authApi.delete(`/api/areas/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export function useRemoveArea() {
  const clientQuery = useQueryClient();
  return useMutation(removeArea, {
    onError: () => {
      toast({ title: 'Al parecer algo ha salido mal!' });
    },
    onSuccess: (data) => {
      toast({ title: 'Area eliminada!' });
    },
    onSettled: () => clientQuery.invalidateQueries({ queryKey: ['areas'] }),
  });
}
