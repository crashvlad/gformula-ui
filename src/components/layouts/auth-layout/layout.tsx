import { PropsWithChildren, useEffect } from 'react';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { AuthProvider } from '@/components/context/AuthContext';
import { driver, Config as DriverConfig } from 'driver.js';

const driverConfiguration: DriverConfig = {
  showProgress: true,
  doneBtnText: 'Finalizar',
  steps: [
    {
      element: '#started-item',
      popover: {
        title: 'Inicio',
        description: 'Descripcion de la pagina de inicio',
        nextBtnText: 'Siguiente',
        prevBtnText: 'Regresar',
      },
    },
    {
      element: '#metric-item',
      popover: {
        title: 'Metrica Clave',
        description: 'Descripcion de metrica clave',
        nextBtnText: 'Siguiente',
        prevBtnText: 'Regresar',
      },
    },
    {
      element: '#objective-item',
      popover: {
        title: 'Objectivos',
        description: 'Descripcion de objetivos',
        nextBtnText: 'Siguiente',
        prevBtnText: 'Regresar',
      },
    },
    {
      element: '#hypothesis-item',
      popover: {
        title: 'Hipotesis',
        description: 'Descripcion de la pagina de hipotesis',
        nextBtnText: 'Siguiente',
        prevBtnText: 'Regresar',
      },
    },
    {
      element: '#dashboard-item',
      popover: {
        title: 'Dashboard',
        description: 'Descripcion de la pagina de hipotesis',
        nextBtnText: 'Siguiente',
        prevBtnText: 'Regresar',
      },
    },
    {
      element: '#health-item',
      popover: {
        title: 'Salud',
        description: 'Descripcion de la pagina de hipotesis',
        nextBtnText: 'Siguiente',
        prevBtnText: 'Regresar',
      },
    },
    {
      element: '#results-item',
      popover: {
        title: 'Resultados',
        description: 'Descripcion de la pagina de hipotesis',
        nextBtnText: 'Siguiente',
        prevBtnText: 'Regresar',
      },
    },
    {
      element: '#notification-item',
      popover: {
        title: 'Notificaciones',
        description: 'Descripcion de la pagina de hipotesis',
        nextBtnText: 'Siguiente',
        prevBtnText: 'Regresar',
      },
    },
  ],
};

interface LayoutProps extends PropsWithChildren {}

export function Layout({ children }: LayoutProps) {
  useEffect(() => {
    const driverIntance = driver(driverConfiguration);

    driverIntance.drive();
  }, []);

  return (
    <AuthProvider>
      <div className="flex flex-col">
        <Header />

        <div className="flex h-full overflow-hidden bg-background lg:min-h-[calc(100vh-3.5rem)]">
          <Sidebar />
          <main className="flex-1 h-full px-6 py-3 overflow-hidden overflow-y-auto lg:ml-56">
            {children}
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
