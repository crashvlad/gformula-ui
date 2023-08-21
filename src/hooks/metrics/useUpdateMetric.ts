import { toast } from '@/components/ui/use-toast';
import { authApi } from '@/lib/auth-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

async function fetchtUpdateMetric(data: any) {
  const { id, ...rest } = data;
  const body = { ...rest };

  try {
    const { data } = await authApi.put(`/api/metrics/${id}`, body);
    return data;
  } catch (error) {
    throw error;
  }
}

export function useUpdateMetric() {
  const clientQuery = useQueryClient();
  return useMutation(fetchtUpdateMetric, {
    onError: () => {
      toast({ title: 'Al parecer algo ha salido mal!' });
    },
    onSuccess: (data) => {
      toast({ title: 'Metrica editada con exito!' });
      clientQuery.invalidateQueries({ queryKey: ['metrics'] });
    },
  });
}
