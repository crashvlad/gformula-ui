import { toast } from '@/components/ui/use-toast';
import { authApi } from '@/lib/auth-api';
import { useMutation } from '@tanstack/react-query';

async function notifyUser(vars) {
  const { userIds, objectiveId } = vars;

  try {
    const { data } = await authApi.post('/api/activities/notify/users', {
      userIds,
      objectiveId,
    });

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export function useNotifyUsers() {
  return useMutation(notifyUser, {
    onError: () => {
      toast({ title: 'Al parecer algo ha salido mal!' });
    },
    onSuccess: (data) => {
      // mixpanel.track("Create area")
      toast({ title: 'Transacción exitosa' });
    },
  });
}
