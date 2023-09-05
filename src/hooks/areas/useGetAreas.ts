import { authApi } from '@/lib/auth-api';
import { useQuery } from '@tanstack/react-query';

async function fetchAccAreas() {
  try {
    const { data } = await authApi.get(`/api/areas`);

    return data.data;
  } catch (error) {
    throw error;
  }
}

export function useGetAreas() {
  const res = useQuery(['areas'], fetchAccAreas);

  const { data, isLoading } = res;

  const areasArr = !isLoading && data ? data : [];

  const areasOptions: { id: string; label: string; value: string }[] =
    areasArr.map((area: any) => ({
      id: area.id,
      label: area.name,
      value: area.name,
    }));

  return { ...res, areasArr, areasOptions };
}
