import { authApi } from '@/lib/auth-api';
import { useQuery } from '@tanstack/react-query';

async function getCrossFunctionalExperimentation() {
  try {
    const { data } = await authApi.get(
      `/api/dashboard/crossfunctional-experimentation`
    );

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export function useGetCrossFunctionalExperimentation() {
  return useQuery(
    ['crossfunctional-experimentation'],
    async () => await getCrossFunctionalExperimentation()
  );
}
