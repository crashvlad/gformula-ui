import { authApi } from '@/lib/auth-api';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

async function getCommentsObjective(id: string | number) {
  try {
    const { data } = await authApi.get(`/api/comments/objective/${id}`);

    return data.data;
  } catch (error) {
    throw error;
  }
}

export function useGetCommentsObjective(id: string | number) {
  const [comments, setComments] = useState([]);
  const res = useQuery(
    ['comments-objective', id],
    async () => await getCommentsObjective(id)
  );

  const { data, isLoading } = res;

  useEffect(() => {
    if (!isLoading && data && data.data) {
      setComments(data.data);
    }
  }, [isLoading, data]);

  return { ...res, comments };
}
