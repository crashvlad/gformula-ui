import * as am5 from '@amcharts/amcharts5';
import * as am5venn from '@amcharts/amcharts5/venn';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

import { useEffect, useLayoutEffect, useState } from 'react';

export const Chart = () => {
  useLayoutEffect(() => {
    var root = am5.Root.new('chartdiv');

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create wrapper container
    var container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.p100,
        height: am5.p100,
        layout: root.verticalLayout,
      })
    );

    // Create venn series
    var chart = container.children.push(
      am5venn.Venn.new(root, {
        categoryField: 'name',
        valueField: 'value',
        intersectionsField: 'sets',
      })
    );

    chart.labels.template.set('text', '{category}: [bold]{value}[/])');

    chart
      .get('colors')
      .set('colors', [
        am5.color(0x095256),
        am5.color(0x087f8c),
        am5.color(0x5aaa95),
        am5.color(0x86a873),
        am5.color(0xbb9f06),
      ]);

    chart.labels.template.setAll({
      text: '{category}',
    });

    chart.data.setAll([
      { name: 'Publicidad', value: 10, color: '#000000' },
      { name: 'Investigación de Mercado', value: 10 },
      { name: 'Estrategia Digital', value: 5 },
      {
        name: 'Redes Sociales',
        value: 4,
        sets: ['Publicidad', 'Investigación de Mercado'],
      },
      {
        name: 'Email Marketing',
        value: 2,
        sets: ['Publicidad', 'Estrategia Digital'],
      },
      {
        name: 'Marketing de Contenido',
        value: 2,
        sets: ['Investigación de Mercado', 'Estrategia Digital'],
        color: am5.color('#fffff'),
      },
      {
        name: 'Gestión de Campañas',
        value: 1,
        sets: ['Publicidad', 'Investigación de Mercado', 'Estrategia Digital'],
      },
    ]);

    // Set tooltip content
    chart.slices.template.set('tooltipText', '{category}: {value}');

    // Set up hover appearance
    chart.hoverGraphics.setAll({
      strokeDasharray: [3, 3],
      stroke: am5.color(0xffffff),
      strokeWidth: 2,
    });

    // Add legend
    var legend = container.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
      })
    );
    legend.data.setAll(chart.dataItems);

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="chartdiv" style={{ width: '100%', height: '350px' }}></div>;
};
