import {
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
    icon: HomeIcon,
    title: 'Inicio',
    path: ROUTES.app_home,
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
    icon: BarChart,
    title: 'Métrica Clave',
    path: ROUTES.app_metric,
  },
  {
    icon: LayoutPanelLeft,
    title: 'Dashboard',
    path: ROUTES.app_dashboard,
  },
  {
    icon: Heart,
    title: 'salud',
    path: ROUTES.app_health,
  },
  {
    icon: FileText,
    title: 'Resultados',
    path: ROUTES.app_results,
  },
];
