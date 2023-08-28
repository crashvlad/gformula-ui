import { authApi } from '@/lib/auth-api';
import { useQuery } from '@tanstack/react-query';

async function getCrossFunctionalInteraction() {
  try {
    const { data } = await authApi.get(
      `/api/dashboard/crossfunctional-interaction`
    );

    return data.data;
  } catch (error) {
    throw new Error(error);
  }
}

export function useGetCrossFunctionalInteraction() {
  return useQuery(
    ['crossfunctional-interaction'],
    async () => await getCrossFunctionalInteraction()
  );
}
