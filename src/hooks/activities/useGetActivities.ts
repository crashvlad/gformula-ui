import { authApi } from '@/lib/auth-api';
import { useQuery } from '@tanstack/react-query';

async function getActivities() {
  try {
    const { data } = await authApi.get('/api/activities');

    return data.data;
  } catch (error) {
    throw error;
  }
}

export function useGetActivities() {
  return useQuery(['activities'], async () => await getActivities());
}
