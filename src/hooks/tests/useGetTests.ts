import { authApi } from '@/lib/auth-api';
import { experimentArrayValidator } from '@/types';
import { useQuery } from '@tanstack/react-query';

interface FilterParams {
  startDate?: string;
  endDate?: string;
  type?: string;
  resultStatus?: string;
}

async function fetchTests(status: string, filter: FilterParams) {
  const queryParams = new URLSearchParams();

  for (const key in filter) {
    if (filter[key]) {
      queryParams.append(key, filter[key]);
    }
  }

  const url = `/api/test/${status}${
    queryParams.toString() ? `?${queryParams.toString()}` : ''
  }`;

  try {
    const { data } = await authApi.get(url);
    return experimentArrayValidator.parse(data.data);
  } catch (error) {
    throw new Error(`Error fetching tests: ${error.message}`);
  }
}

export function useGetTests({
  status = 'all',
  filter = {},
  enabled = true,
}: {
  status?: string;
  filter?: FilterParams;
  enabled?: boolean;
} = {}) {
  const res = useQuery(
    ['tests', status, filter],
    async () => await fetchTests(status, filter),
    { enabled }
  );

  return { ...res, tests: res.data ?? [] };
}
