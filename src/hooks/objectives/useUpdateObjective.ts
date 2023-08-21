import { toast } from '@/components/ui/use-toast';
import { authApi } from '@/lib/auth-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

async function fetchUpdateObjective(data: any) {
  const { id, ...rest } = data;
  const body = { ...rest };

  try {
    const { data } = await authApi.put(`/api/objectives/${id}`, body);
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

export function useUpdateObjective() {
  const clientQuery = useQueryClient();
  return useMutation(fetchUpdateObjective, {
    onError: () => {
      toast({ title: 'Al parecer algo ha salido mal!' });
    },
    onSuccess: (data) => {
      toast({ title: `Objetivo ${data.data.name} editado!` });
    },
    onSettled: () =>
      clientQuery.invalidateQueries({ queryKey: ['objectives'] }),
  });
}
