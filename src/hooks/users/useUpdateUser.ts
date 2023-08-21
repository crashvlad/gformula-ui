import { toast } from '@/components/ui/use-toast';
import { authApi } from '@/lib/auth-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

async function updateUser(data: any) {
  const { id, ...rest } = data;
  const body = { ...rest };

  try {
    const { data } = await authApi.put(`/api/users/${id}`, body);
    return data;
  } catch (error) {
    throw error;
  }
}

export function useUpdateUser() {
  const clientQuery = useQueryClient();
  return useMutation(updateUser, {
    onError: () => {
      toast({ title: 'Al parecer algo ha salido mal!' });
    },
    onSuccess: (data) => {
      toast({ title: `Usuario ${data.data.name} editado!` });
    },
    onSettled: () => {
      clientQuery.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
