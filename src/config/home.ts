import {
  BarChart,
  FileText,
  Heart,
  LayoutPanelLeft,
  Lightbulb,
} from 'lucide-react';

export const pagesInfoConfig = [
  {
    id: 1,
    bg: '#D5DAFA',
    color: '#556EE5',
    icon: Lightbulb,
    to: '/app/hipotesis',
    btnText: 'Crear Hipótesis',
    title: 'Hipótesis',
    description: `Crea ideas de experimentación según una hipótesis y describe su impacto en los procesos de crecimiento.`,
  },
  {
    id: 2,
    bg: '#D5DAFA',
    color: '#556EE5',
    icon: FileText,
    to: '/app/resultados',
    btnText: 'Ver Resultados',
    title: 'Resultados',
    description: `Mira y compara los resultados de los experimentos de tus equipos y aprende de las hipótesis.`,
  },
  {
    id: 3,
    bg: '#D5DAFA',
    color: '#556EE5',
    icon: BarChart,
    to: '/app/metrica-clave',
    btnText: 'Ver Métrica',
    title: 'Métrica Clave',
    description: `Sigue los objetivos planteados por tus equipos y mide los indicadores clave de los experimentos.`,
  },
  {
    id: 4,
    bg: '#D5DAFA',
    color: '#556EE5',
    icon: LayoutPanelLeft,
    to: '/app/panel',
    btnText: 'Ver Tablero',
    title: 'Tablero',
    description: `Revisa los reportes para conocer el impacto de las hipótesis y tomar las mejores decisiones.`,
  },
  {
    id: 5,
    bg: '#D5DAFA',
    color: '#556EE5',
    icon: Heart,
    to: '/app/salud',
    btnText: 'Ver Salud',
    title: 'Salud',
    description: `Monitorea, identifica y filtra las ideas de experimentación de todas las aportaciones de los equipos.`,
  },
];
