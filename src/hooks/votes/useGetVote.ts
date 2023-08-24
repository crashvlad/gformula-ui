import { authApi } from '@/lib/auth-api';
import { useQuery } from '@tanstack/react-query';

async function fetchVote(id) {
  try {
    const { data } = await authApi.get(`/api/votes/${id}`);

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export function useGetVote(id) {
  return useQuery(['vote', id], () => fetchVote(id));
}
