import { toast } from '@/components/ui/use-toast';
import { authApi } from '@/lib/auth-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

async function updateUserPassword(data: any) {
  const { id, ...rest } = data;
  const body = { ...rest };

  try {
    const { data } = await authApi.put(
      `/api/users/update-password/${id}`,
      body
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export function useUpdateUserPassword() {
  const clientQuery = useQueryClient();
  return useMutation(updateUserPassword, {
    onError: () => {
      toast({ title: 'Algo ha salido mal!' });
    },
    onSuccess: (data) => {
      toast({ title: `Usuario ${data.data.name} editado!` });
    },
    onSettled: () => {
      clientQuery.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
