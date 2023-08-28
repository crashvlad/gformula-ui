import { authApi } from '@/lib/auth-api';
import { useQuery } from '@tanstack/react-query';

async function fetchAreaExperimentation() {
  try {
    const { data } = await authApi.get('/api/dashboard/area-experimentation');

    return data.data;
  } catch (error) {
    throw new Error(error);
  }
}

export function useGetAreaExperimentationData() {
  return useQuery(['area-experimentation'], fetchAreaExperimentation);
}
