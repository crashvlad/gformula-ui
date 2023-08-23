import { experimentValidator } from '@/types';
import { authApi } from '@/lib/auth-api';
import { useQuery } from '@tanstack/react-query';

async function fetchTest(id: string) {
  try {
    const { data } = await authApi.get(`/api/test/detail/${id}`);

    return experimentValidator.parse(data.data);
  } catch (error) {
    throw new Error(error);
  }
}

export function useGetTest(id: string, enabled = true) {
  return useQuery(['test', id], async () => await fetchTest(id), {
    enabled,
  });
}
