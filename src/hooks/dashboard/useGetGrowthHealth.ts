import { authApi } from '@/lib/auth-api';
import { useQuery } from '@tanstack/react-query';

async function fetchGrowthHealth() {
  try {
    const { data } = await authApi.get('/api/dashboard/growth-health');

    return data.data;
  } catch (error) {
    throw new Error(error);
  }
}

export function useGetGrowthHealth() {
  return useQuery(['growth-health'], async () => await fetchGrowthHealth());
}
