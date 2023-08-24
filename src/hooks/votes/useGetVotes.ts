import { authApi } from '@/lib/auth-api';
import { useQuery } from '@tanstack/react-query';

async function getVotes({ queryKey }) {
  const [_, testId] = queryKey;

  try {
    const { data } = await authApi.get(`/api/votes?testId=${testId}`);

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export function useGetVotes(testId) {
  return useQuery(['votes', testId], getVotes, {
    staleTime: 2000,
  });
}
