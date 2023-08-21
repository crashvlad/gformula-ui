import { authApi } from '@/lib/auth-api';
import { useQuery } from '@tanstack/react-query';

async function fetchLoginUser() {
  try {
    const { data } = await authApi.get('/auth/login-user');

    return data;
  } catch (error) {
    throw error;
  }
}

export function useGetLoginUser() {
  return useQuery(['login-user'], async () => await fetchLoginUser());
}
