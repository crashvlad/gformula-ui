export const ROUTES = {
  login: '/login',
  app_dashboard: '/app/panel',
  app_settings: '/app/configuracion',
  app_home: '/app/inicio',
  app_objectives: '/app/objetivos',
  app_objectives_detail: (id: string | number) => `/app/objetivos/${id}`,
  app_hypothesis: '/app/hipotesis',
  app_results: '/app/resultados',
  app_metric: '/app/metrica-clave',
  app_metric_detail: (id: string | number) => `/app/metrica-clave/${id}`,
  app_health: '/app/salud',
};
