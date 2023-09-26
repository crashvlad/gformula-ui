import { Chart } from 'chart.js/auto';
import { Flow, SankeyController } from 'chartjs-chart-sankey';
import { useEffect } from 'react';

Chart.register(SankeyController, Flow);

const colors = [
  '#374B42',
  '#00C5FF',
  '#9AB0A6',
  '#3C608F',
  '#02EEB1',
  '#00390F',
];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

type CharProps = {
  data: { from: string; to: string; flow: number }[];
  labels: Record<string, string>;
};

export const CrossfunctionalExperimentationChart = ({
  data,
  labels,
}: CharProps) => {
  useEffect(() => {
    // @ts-ignore
    const ctx = document.getElementById('chart-area').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'sankey',
      data: {
        datasets: [
          {
            label: 'Chart Experimentación Crossfuncional',
            data: data,
            colorFrom: (c) => getRandomColor(),
            colorTo: (c) => getRandomColor(),
            colorMode: 'gradient',
            labels: labels,
            size: 'max',
            borderWidth: 0,
            color: 'lightgray',
            font: { size: 16, weight: '700' },
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              title(tooltipItems) {
                return 'Total Experimentación';
              },
              label: (ctx) => {
                const item = ctx.dataset.data[ctx.dataIndex];
                return `${item.from} a ${item.to}: Ideas ${item.flow}`;
              },
              labelColor: function (ctx) {
                return {
                  borderColor: '',
                  backgroundColor: '#02EEB1',
                  borderWidth: 2,
                  borderDash: [2, 2],
                  borderRadius: 2,
                  padding: 5,
                };
              },
              labelTextColor: function (context) {
                return '	#a1a1aa';
              },
            },
          },
        },
      },
    });
  }, []);

  return <canvas id="chart-area" />;
};
