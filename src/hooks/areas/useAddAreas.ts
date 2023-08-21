import { areaFormSchema } from '@/components/modules/areas/area-dialog-form';
import { toast } from '@/components/ui/use-toast';
import { authApi } from '@/lib/auth-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

async function addArea(formData: z.infer<typeof areaFormSchema>) {
  try {
    const { data } = await authApi.post('/api/areas', { ...formData });

    return data;
  } catch (error) {
    throw error;
  }
}

export function useAddArea() {
  const clientQuery = useQueryClient();
  return useMutation(addArea, {
    onSettled: () => clientQuery.invalidateQueries({ queryKey: ['areas'] }),
    onError: () => {
      toast({ title: 'Al parecer algo ha salido mal!' });
    },
    onSuccess: (data) => {
      toast({ title: 'Area creada!' });
    },
  });
}
