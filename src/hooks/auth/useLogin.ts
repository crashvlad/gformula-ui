import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { userAuthSchema } from '@/lib/validations/auth';
import { authApi } from '@/lib/auth-api';
import { useRouter } from 'next/router';
import { useToast } from '@/components/ui/use-toast';
import { useLocalStorage } from '../useLocalStorage';
import { ROUTES } from '@/config/routes';
import axios, { AxiosError } from 'axios';
import { api } from '@/lib/api';

type FormData = z.infer<typeof userAuthSchema>;

async function login(formData: FormData) {
  const body = { ...formData };

  try {
    const { data } = await api.post('/auth/login', body);

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

    throw new Error('Al parecer algo ha salido mal!');
  }
}

function useLogin() {
  const router = useRouter();
  const { toast } = useToast();
  const [_, setValue] = useLocalStorage('acc_token', '');

  return useMutation(login, {
    onSuccess: (data) => {
      setValue(data.token);
      router.push(ROUTES.app_home);
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: 'Al parecer algo ha salido mal!',
        variant: 'destructive',
      });
    },
  });
}

export { useLogin, login };
