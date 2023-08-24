import { authApi } from '@/lib/auth-api';
import { useQuery } from '@tanstack/react-query';

async function getCommentsTest(id: string | number) {
  try {
    const { data } = await authApi.get(`/api/comments/test/${id}`);

    return data.data;
  } catch (error) {
    throw new Error(error);
  }
}

export function useGetTestComments(id: string | number) {
  const res = useQuery(
    ['comments-test', id],
    async () => await getCommentsTest(id)
  );

  const comments = res?.data ?? [];

  return { ...res, comments };
}
