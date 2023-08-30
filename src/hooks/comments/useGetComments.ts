import { authApi } from '@/lib/auth-api';
import { useQuery } from '@tanstack/react-query';

import { useEffect, useState } from 'react';

async function getComments() {
  try {
    const { data } = await authApi.get(`/api/comments`);

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export function useGetComments() {
  const [comments, setComments] = useState([]);
  const res = useQuery(['all-comments'], getComments);

  const { data, isLoading } = res;

  useEffect(() => {
    if (!isLoading && data && data.data) {
      setComments(data.data);
    }
  }, [isLoading, data]);

  return { ...res, comments };
}
