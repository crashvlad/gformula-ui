import { api } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';

async function postContactLead(formData: any) {
  const body = { ...formData };

  try {
    const { data } = await api.post('/leads/contacto', body);

    return data;
  } catch (error) {
    throw error;
  }
}

export function useContactLead() {
  return useMutation(postContactLead, {});
}
