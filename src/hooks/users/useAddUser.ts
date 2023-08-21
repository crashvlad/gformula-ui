import { toast } from '@/components/ui/use-toast';
import { authApi } from '@/lib/auth-api';
import { User } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

async function fetchAddUser(formData: any) {
  const body = { ...formData };

  try {
    const { data } = await authApi.post('/api/users', body);

    return data;
  } catch (error) {
    throw error;
  }
}

export function useAddUser() {
  const queryClient = useQueryClient();

  return useMutation(fetchAddUser, {
    // onMutate: async (newUser) => {
    //   await queryClient.cancelQueries({ queryKey: ['users'] });
    //   const previousUsers = queryClient.getQueryData<User[]>(['users']);

    //   queryClient.setQueryData(['users'], (old: any) => {
    //     const res = [
    //       { ...newUser, id: Date.now(), createdAt: new Date().toUTCString() },
    //       ...old,
    //     ];

    //     return res;
    //   });

    //   return { previousUsers };
    // },
    onError: (error, vars, ctx) => {
      // queryClient.setQueryData(['users'], ctx?.previousUsers);
      console.error(error);
      toast({ title: 'Al parecer algo ha salido mal!' });
    },
    onSuccess: (data) => {
      toast({ title: 'Usuario creado!' });
    },
    onSettled: () => {
      queryClient.invalidateQueries(['users']);
    },
  });
}
