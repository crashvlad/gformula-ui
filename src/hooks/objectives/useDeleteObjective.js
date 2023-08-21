import { useMutation, useQueryClient } from '@tanstack/react-query';
import mixpanel from 'mixpanel-browser';
import { toast } from 'react-toastify';
import authRequest from 'utils/auth-request';
import { fireHandleDeleteModal } from 'utils/fire-alert';
import { getAccessToken } from 'utils/local-storage';

async function deleteObjective(data) {
  const { id } = data
  const token = getAccessToken("acc_token")
  try {
    const { data } = await authRequest.delete(`/api/objectives/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return data
  } catch (error) {
    throw new Error(error)
  }
}

function useDeleteObjective() {
  const queryClient = useQueryClient()
  const { mutate } = useMutation(["delete-bjective"], deleteObjective, {
    onError: () => {
      toast.error("Al parecer algo ha salido mal!")
    },
    onSuccess: data => {
      toast.success("Objetivo eliminado!")
      mixpanel.track("Remove objective")
    },
    onSettled: data => queryClient.invalidateQueries("objectives", "all"),
  })

  async function handleDelete(id) {
    const resAlert = await fireHandleDeleteModal()

    if (resAlert.isConfirmed) {
      mutate({ id })
    }
  }

  return { handleDelete }
}

export default useDeleteObjective
