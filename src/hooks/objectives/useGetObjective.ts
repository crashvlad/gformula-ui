import { authApi } from '@/lib/auth-api';
import { objectiveValidator } from '@/types';
import { useQuery } from '@tanstack/react-query';

async function fetchObjective(id: string | number) {
  try {
    const { data } = await authApi.get(`/api/objectives/objective/${id}`);

    return objectiveValidator.parse(data.data);
  } catch (error) {
    throw error;
  }
}

export function useGetObjective(id: number | string, enabled: boolean) {
  return useQuery(['objective', id], async () => await fetchObjective(id), {
    enabled,
  });
}
