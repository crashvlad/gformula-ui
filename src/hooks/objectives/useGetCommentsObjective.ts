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

export function useGetCommentsObjective(id: string | number, enabled = true) {
  const res = useQuery(
    ['comments-objective', id],
    async () => await getCommentsObjective(id),
    { enabled: enabled }
  );

  const comments = res.data ?? [];

  return { ...res, comments };
}
