import {
  ArrowUp,
  BarChart,
  FileText,
  Flag,
  Heart,
  HomeIcon,
  LayoutPanelLeft,
  Lightbulb,
} from 'lucide-react';
import { ROUTES } from './routes';

export const sidebarConfig = [
  {
    icon: ArrowUp,
    title: 'Get started',
    path: ROUTES.app_home,
  },
  {
    icon: BarChart,
    title: 'Métrica Clave',
    path: ROUTES.app_metric,
  },
  {
    icon: Flag,
    title: 'Objetivos',
    path: ROUTES.app_objectives,
  },
  {
    icon: Lightbulb,
    title: 'Hipótesis',
    path: ROUTES.app_hypothesis,
  },

  {
    icon: LayoutPanelLeft,
    title: 'Dashboard',
    path: ROUTES.app_dashboard,
  },
  {
    icon: Heart,
    title: 'Salud',
    path: ROUTES.app_health,
  },
  {
    icon: FileText,
    title: 'Resultados',
    path: ROUTES.app_results,
  },
];
