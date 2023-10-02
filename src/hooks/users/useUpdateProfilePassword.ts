import { toast } from '@/components/ui/use-toast';
import { authApi } from '@/lib/auth-api';
import { useMutation } from '@tanstack/react-query';

async function putUpdateProfilePassword(data: any) {
  const body = { ...data };

  try {
    const { data } = await authApi.put(
      `/api/users/update-profile-password`,
      body
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export function useUpdateProfilePassword() {
  return useMutation(putUpdateProfilePassword, {
    onError: () => {
      toast({ title: 'Algo ha salido mal!' });
    },
    onSuccess: (data) => {
      toast({ title: `Contraseña editada correctamente` });
    },
  });
}
