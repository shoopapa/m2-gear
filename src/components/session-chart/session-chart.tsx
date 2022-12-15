import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { withTheme } from 'react-native-paper';

import { ThemeType } from '../../styles/theme';
import { simpleSection } from '../../utils/save-session';

type SessionChartProps = {
  data: number[][];
  theme: ThemeType;
  disabled?: boolean;
  epochStart?: number
  epochEnd?: number
  sections?: number[]
};

const lineColors = [
  'rgba(210,77,90,1)',
  'rgba(156,209,72,1)',
  'rgba(178,143,220,1)',
  'rgba(150,150,150,1)',
];
const disabledLineColors = [
  'rgba(210,77,90,0.5)',
  'rgba(156,209,72,0.5)',
  'rgba(178,143,220,0.5)',
  'rgba(150,150,150,0.5)',
];

// type ChartHighlightProps = {
//   theme: ThemeType;
//   epochStart: number
//   epochEnd: number
//   highlightStart: number
//   highlightEnd: number
// };
// const ChartHighlight =  withTheme(({theme,
//   epochStart,
//   epochEnd,
//   highlightStart,
//   highlightEnd,
// }:ChartHighlightProps) => {

//   const leftOffset = 11
//   const rightOffset = 100

//   const marginLeft = leftOffset + (highlightStart/(epochEnd - epochStart))*100 + '%'
//   const marginRight = 100-((highlightEnd)/(epochEnd - epochStart)*100) + '%'
//   console.log(marginLeft,marginRight)
//   return (
//     <Text
//       style={{
//         marginLeft:'50%',
//         width:'10%',
//         // marginLeft: leftOffset  + '%',

//         padding:0,
//         backgroundColor:'blue',
//         opacity:.3,
//         height:'69%',
//         position:'absolute',
//         top: '11%',
//         zIndex:1000
//       }}
//    ></Text>
//   )
// })

export const SessionChart = withTheme(
  ({ data, disabled, theme, epochStart, sections }: SessionChartProps) => {
    return (
      <View style={{
        height:'100%',
        width:'100%',
      }}>
      <LineChart
        withShadow={false}
        style={{
          marginBottom: -40,
          marginLeft: -20,
          marginTop: 20,
          position:'absolute',
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
          labelColor: () => theme.colors.text,
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

      </View>
    );
  },
);
