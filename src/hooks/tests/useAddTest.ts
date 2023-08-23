import { toast } from '@/components/ui/use-toast';
import { authApi } from '@/lib/auth-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

async function fetchAddTest(formData: any) {
  const body = { ...formData };

  try {
    const { data } = await authApi.post('/api/test', body);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export function useAddTest() {
  const clientQuery = useQueryClient();

  return useMutation(fetchAddTest, {
    onSettled: () => clientQuery.invalidateQueries({ queryKey: ['tests'] }),

    onSuccess: (data) => {
      toast({ title: 'Hipótesis creada!' });
    },
    onError: (error, vars, ctx) => {
      console.error(error);
      toast({ title: 'Al parecer algo ha salido mal!' });
    },
  });
}
