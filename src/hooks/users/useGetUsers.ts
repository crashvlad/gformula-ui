import { authApi } from '@/lib/auth-api';
import { userArrayValidator } from '@/types';
import { useQuery } from '@tanstack/react-query';

async function fetchUsers() {
  try {
    const { data } = await authApi.get('/api/users');

    return userArrayValidator.parse(data.data);
  } catch (error) {
    throw error;
  }
}

export function useGetUsers() {
  return useQuery(['users'], async () => await fetchUsers());
}
