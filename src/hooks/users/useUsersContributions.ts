import { authApi } from '@/lib/auth-api';
import { useQuery } from '@tanstack/react-query';

async function fetchUserContributions({ queryKey }) {
  const [_, filter] = queryKey;
  let url = '/api/users/stats/members-contribution';

  if (filter.start && filter.end) {
    const { start, end } = filter;
    url = `/api/users/stats/members-contribution?startDate=${start}&endDate=${end}`;
  }

  try {
    const { data } = await authApi.get(url);

    return data.data;
  } catch (error) {
    throw new Error(error);
  }
}

export function useUserContributions(filter = {}) {
  return useQuery(['members-contribution', filter], fetchUserContributions);
}
