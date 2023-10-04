import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { cn } from '@/lib/utils';
import { userAuthSchema } from '@/lib/validations/auth';
import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icons';
import { useLogin } from '@/hooks';
import { IS_PRODUCTION } from '@/lib/contants';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>;

export function LoginForm({ className, ...props }: LoginFormProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
    defaultValues: !IS_PRODUCTION
      ? {
          email: 'admin@velogig.com',
          password: 'DYgSg7cXcw',
        }
      : {},
  });
  const { mutate: handleLogin, isLoading } = useLogin();
  const loading = isLoading || isSubmitting;

  async function onSubmit(data: FormData) {
    handleLogin(data);
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label className="" htmlFor="email">
              Correo
            </Label>
            <Input
              id="email"
              type="email"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={loading}
              {...register('email')}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label className="" htmlFor="password">
              Contraseña
            </Label>

            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                disabled={loading}
                {...register('password')}
              />
              {showPassword ? (
                <EyeOffIcon
                  onClick={() => setShowPassword(false)}
                  className="absolute h-5 cursor-pointer right-2 top-3 text-muted-foreground hover:text-muted"
                />
              ) : (
                <EyeIcon
                  onClick={() => setShowPassword(true)}
                  className="absolute h-5 cursor-pointer right-2 top-3 text-muted-foreground hover:text-muted"
                />
              )}
            </div>

            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={loading}>
            {loading ? (
              <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <>Inciar sesion</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
