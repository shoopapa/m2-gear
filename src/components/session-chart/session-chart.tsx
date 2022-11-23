import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { withTheme } from 'react-native-paper';

import { ThemeType } from '../../styles/theme';

type SessionChartProps = {
  data: number[][];
  theme: ThemeType;
  disabled?: boolean;
};

const lineColors = [
  'rgba(210,77,90,1)',
  'rgba(156,209,72,1)',
  'rgba(178,143,220,1)',
];
const disabledLineColors = [
  'rgba(210,77,90,0.5)',
  'rgba(156,209,72,0.5)',
  'rgba(178,143,220,0.5)',
];

export const SessionChart = withTheme(
  ({ data, disabled, theme }: SessionChartProps) => {
    return (
      <LineChart
        withShadow={false}
        style={{
          marginBottom: -40,
          marginLeft: -20,
          paddingTop: 20,
          backgroundColor: theme.colors.defaultBackgroundColor,
        }}
        data={{
          labels: ['time'],
          datasets: [
            ...data.map((d, i) => {
              return {
                data: d,
                color: () => (disabled ? disabledLineColors[i] : lineColors[i]),
              };
            }),
            { data: [6, -6], color: () => 'rgba(0,0,0,0)' },
          ],
        }}
        formatYLabel={(v) => {
          if (v === 'NaN') {
            return '0g';
          }
          return parseFloat(v).toFixed(1) + 'g';
        }}
        formatXLabel={() => ''}
        withVerticalLines={false}
        // withHorizontalLines={false}
        withDots={false}
        withInnerLines={false}
        width={Dimensions.get('window').width} // moving to middle cuz i got rid of y labels
        bezier
        height={240}
        chartConfig={{
          propsForBackgroundLines: {
            strokeDasharray: null,
          },
          backgroundGradientFromOpacity: 0,
          backgroundGradientToOpacity: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          strokeWidth: 2, // optional, default 3
          barPercentage: 0.5,
          useShadowColorFromDataset: false, // optional,
        }}
      />
    );
  },
);
