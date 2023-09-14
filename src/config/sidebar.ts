import {
  BarChart,
  FileText,
  Flag,
  Heart,
  Home,
  LayoutPanelLeft,
  Lightbulb,
} from 'lucide-react';
import { ROUTES } from './routes';

export const sidebarConfig = [
  {
    id: 'started-item',
    icon: Home,
    title: 'Inicio',
    path: ROUTES.app_home,
  },
  {
    id: 'metric-item',
    icon: BarChart,
    title: 'Métrica Clave',
    path: ROUTES.app_metric,
  },
  {
    id: 'objective-item',
    icon: Flag,
    title: 'Objetivos',
    path: ROUTES.app_objectives,
  },
  {
    id: 'hypothesis-item',
    icon: Lightbulb,
    title: 'Hipótesis',
    path: `${ROUTES.app_hypothesis}`,
  },

  {
    id: 'dashboard-item',
    icon: LayoutPanelLeft,
    title: 'Dashboard',
    path: ROUTES.app_dashboard,
  },
  {
    id: 'health-item',
    icon: Heart,
    title: 'Salud',
    path: ROUTES.app_health,
  },
  {
    id: 'results-item',
    icon: FileText,
    title: 'Resultados',
    path: ROUTES.app_results,
  },
];
