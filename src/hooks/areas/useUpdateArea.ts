import { toast } from '@/components/ui/use-toast';
import { authApi } from '@/lib/auth-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

async function updateArea(data: { id: string; name: string }) {
  const { id, ...rest } = data;
  const body = { ...rest };

  try {
    const { data } = await authApi.put(`/api/areas/${id}`, body);
    return data;
  } catch (error) {
    throw error;
  }
}

export function useUpdateArea() {
  const clientQuery = useQueryClient();
  return useMutation(updateArea, {
    onError: () => {
      toast({ title: 'Al parecer algo ha salido mal!' });
    },
    onSuccess: (data) => {
      toast({ title: `Área editada correctamente` });
    },
    onSettled: () => {
      clientQuery.invalidateQueries({ queryKey: ['areas'] });
    },
  });
}
