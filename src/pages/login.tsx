import { Metadata } from 'next';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { LoginForm } from '@/components/auth';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
};

export default function LoginPage() {
  return (
    <div className="container flex flex-col items-center justify-center w-screen h-screen">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute left-4 top-4 md:left-8 md:top-8'
        )}
      >
        <>
          <Icons.chevronLeft className="w-4 h-4 mr-2" />
          Regresar
        </>
      </Link>
      <div className="mx-auto border flex w-full flex-col justify-center p-4 rounded-md shadow-md space-y-6 sm:w-[450px]">
        <div className="flex flex-col">
          <Icons.logo className="mx-auto" />
          <h1 className="mt-6 text-xl font-semibold tracking-tight md:text-2xl">
            Inicia Sesión para continuar
          </h1>
        </div>
        <LoginForm />
        <p className="px-8 text-sm text-center text-muted-foreground">
          <Link
            href="/register"
            className="underline hover:text-brand underline-offset-4"
          >
            Aún no tienes una cuenta? Registrate
          </Link>
        </p>
      </div>
    </div>
  );
}
