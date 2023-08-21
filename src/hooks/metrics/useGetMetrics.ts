import { metricFormSchema } from '@/components/modules/metrics';
import { authApi } from '@/lib/auth-api';
import { metricArrayValidator } from '@/types';
import { useQuery } from '@tanstack/react-query';

async function fetchMetrics() {
  try {
    const { data } = await authApi.get('/api/metrics');

    return metricArrayValidator.parse(data.data);
  } catch (error) {
    throw error;
  }
}

export function useGetMetrics() {
  const query = useQuery(['metrics'], fetchMetrics);

  const metricsOptions =
    query?.data?.map((m: any) => ({
      id: m.id,
      label: m.name,
      value: m.id.toString(),
    })) || [];

  return { ...query, metricsOptions };
}
