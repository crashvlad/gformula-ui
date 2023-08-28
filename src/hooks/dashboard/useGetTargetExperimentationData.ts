import { authApi } from '@/lib/auth-api';
import { useQuery } from '@tanstack/react-query';

async function fetchTargetExperimentation() {
  try {
    const { data } = await authApi.get('/api/dashboard/target-experimentation');

    return data.data;
  } catch (error) {
    throw new Error(error);
  }
}

export function useGetTargetExperimentationData() {
  return useQuery(['target-experimentation'], fetchTargetExperimentation);
}
