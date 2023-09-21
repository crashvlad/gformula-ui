import { toast } from '@/components/ui/use-toast';
import { authApi } from '@/lib/auth-api';
import { useMutation } from '@tanstack/react-query';

async function fetchAddFeedback(formData: any) {
  const body = { ...formData };

  try {
    const { data } = await authApi.post('/api/support/feedback', body);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export function useAddFeedback() {
  return useMutation(fetchAddFeedback, {
    onSuccess: (data) => {
      toast({ title: 'Gracias por tus comentarios!' });
    },
    onError: (error, vars, ctx) => {
      console.error(error);
      toast({ title: 'Al parecer algo ha salido mal!' });
    },
  });
}
