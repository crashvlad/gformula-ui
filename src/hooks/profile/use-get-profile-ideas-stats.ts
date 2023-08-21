import { authApi } from '@/lib/auth-api';
import { getAccessToken } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';

async function getProfileIdeasStats() {
  try {
    const { data } = await authApi.get(`/api/dashboard/profile/ideas/stats`);

    return data;
  } catch (error) {
    throw new Error();
  }
}

function useGetProfileIdeasStats() {
  return useQuery(['profile-stats'], getProfileIdeasStats, {
    select: (data) => data.data.resutlStatsData,
  });
}

export { useGetProfileIdeasStats, getProfileIdeasStats };
