import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

function Error({ statusCode }) {
  return (
    <main className="grid min-h-screen px-6 py-24 place-items-center sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-primary">
          {statusCode && statusCode}{' '}
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          Página no encontrada
        </h1>
        <p className="mt-6 text-base leading-7 text-muted-foreground">
          Lo sentimos, no encontramos la página que estas buscando
        </p>
        <div className="flex items-center justify-center mt-10 gap-x-6">
          <Link href="/" className={buttonVariants()}>
            Volver al inicio
          </Link>
          <Link href="/soporte" className="text-sm font-semibold ">
            Contactar soporte <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
