import { toast } from '@/components/ui/use-toast';
import { authApi } from '@/lib/auth-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

async function fetchAddMetric(formData: any) {
  const body = { ...formData };

  try {
    const { data } = await authApi.post('/api/metrics', body);

    return data;
  } catch (error) {
    throw error;
  }
}

export function useAddMetric() {
  const queryClient = useQueryClient();

  return useMutation(fetchAddMetric, {
    onError: () => {
      toast({ title: 'Al parecer algo ha salido mal!' });
    },
    onSuccess: () => {
      toast({ title: 'Métrica creada con exito!' });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['metrics'] }),
  });
}
