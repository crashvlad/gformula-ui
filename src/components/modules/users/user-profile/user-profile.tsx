import { Button } from '@/components/ui/button';
import { UserProfilePersonalForm } from './user-profile-personal-form';
import { UserProfileUpdatePasswordForm } from './user-profile-update-password';
import { useUser } from '@/components/context/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';

function InfoColumn({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h2 className="text-base font-semibold leading-7 text-white">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-gray-400">{description}</p>
    </div>
  );
}

export const UserProfile = () => {
  return (
    <div className="divide-y divide-white/5">
      <div className="grid grid-cols-1 px-4 py-16 max-w-7xl gap-x-8 gap-y-10 sm:px-6 md:grid-cols-3 lg:px-8">
        <InfoColumn
          title="Información Personal"
          description="Use una dirección permanente donde pueda recibir correo."
        />

        <UserProfilePersonalForm />
      </div>

      <div className="grid grid-cols-1 px-4 py-16 max-w-7xl gap-x-8 gap-y-10 sm:px-6 md:grid-cols-3 lg:px-8">
        <InfoColumn
          title="Cambiar contraseña"
          description="Actualiza tu contraseña asociada a tu cuenta."
        />

        <UserProfileUpdatePasswordForm />
      </div>

      <div className="grid grid-cols-1 px-4 py-16 max-w-7xl gap-x-8 gap-y-10 sm:px-6 md:grid-cols-3 lg:px-8">
        <InfoColumn
          title="Eliminar cuenta"
          description="¿Ya no deseas utilizar nuestro servicio? Puedes eliminar tu cuenta
            aquí. Esta acción no es reversible. Toda la información relacionada
            con esta cuenta se eliminará de forma permanente"
        />

        <form className="flex items-start md:col-span-2">
          <Button type="submit" variant="destructive">
            Si, eliminar mi cuenta
          </Button>
        </form>
      </div>
    </div>
  );
};
