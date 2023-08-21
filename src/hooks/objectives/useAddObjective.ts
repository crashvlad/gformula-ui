import { toast } from '@/components/ui/use-toast';
import { authApi } from '@/lib/auth-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

async function addObjective(formData: any) {
  const body = { ...formData };

  try {
    const { data } = await authApi.post('/api/objectives', body);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // Si hay una respuesta con código de estado, puedes manejarlo aquí
        console.error(
          'Error de servidor:',
          axiosError.response.status,
          axiosError.response.data
        );
      } else if (axiosError.request) {
        // Si la solicitud fue hecha pero no hubo respuesta del servidor (problemas de red)
        console.error('Error de red:', axiosError.request);
      } else {
        // Otros tipos de errores de Axios
        console.error('Error de Axios:', axiosError.message);
      }
    } else {
      // Otros tipos de errores
      console.error('Error:', error);
    }
    throw error;
  }
}

export function useAddObjective() {
  const clientQuery = useQueryClient();

  return useMutation(addObjective, {
    onSettled: () => {
      clientQuery.invalidateQueries({ queryKey: ['objectives'] });
      clientQuery.invalidateQueries({ queryKey: ['metric-account'] });
    },
    onMutate: async (newObjective) => {
      await clientQuery.cancelQueries({
        queryKey: ['objectives', 'all', {}],
      });
      const previousObjectives = clientQuery.getQueryData([
        'objectives',
        'all',
        {},
      ]);

      clientQuery.setQueryData(['objectives', 'all', {}], (old: any) => {
        // const res = {
        //   ...old,
        //   data: [
        //     {
        //       ...newObjective,
        //       id: Date.now(),
        //       createdAt: new Date().toUTCString(),
        //     },
        //     ...old.data,
        //   ],
        // };

        // return res;

        return old;
      });

      return { previousObjectives };
    },
    onError: (error, vars, ctx) => {
      clientQuery.setQueryData(
        ['objectives', 'all', {}],
        ctx?.previousObjectives
      );
      console.error(error);
      toast({ title: 'Al parecer algo ha salido mal!' });
    },
    onSuccess: (data) => {
      toast({ title: 'Objetivo creado!' });
    },
  });
}
