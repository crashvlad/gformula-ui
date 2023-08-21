import { authApi } from '@/lib/auth-api';
import { objectiveArrayValidator } from '@/types';
import { useQuery } from '@tanstack/react-query';

async function fetchObjectives({ queryKey }: { queryKey: any[] }) {
  const [_, status, filter] = queryKey;
  let url = `/api/objectives/${status}`;

  if (filter.search) {
    url = `/api/objectives/${status}?search=${filter.search}`;
  }

  if (filter.startDate || filter.endDate) {
    const { startDate, endDate } = filter;
    url = `/api/objectives/${status}?startDate=${startDate}&endDate=${endDate}`;
  }

  try {
    const { data } = await authApi.get(url);

    const objectives = objectiveArrayValidator.parse(data.data);

    return objectives;
  } catch (error) {
    console.log(error);

    throw new Error('Algo ha salido mal porfavor intentalo de nuevo');
  }
}

export function useGetObjectives(status = 'all', filters = {}) {
  const query = useQuery(['objectives', status, filters], fetchObjectives);

  const optionsObjectives = query.data?.map((objective: any) => ({
    id: objective.id,
    label: objective.name,
    value: objective.id.toString(),
  }));

  return { ...query, optionsObjectives };
}
