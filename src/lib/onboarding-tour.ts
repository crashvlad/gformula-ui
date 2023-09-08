import { Config } from 'driver.js';

export const onboardingTourConfiguration: Config = {
  showProgress: false,
  doneBtnText: 'Finalizar',
  popoverClass: 'driverjs-theme',
  overlayColor: 'hsl(var(--background) / 0.8)',
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
