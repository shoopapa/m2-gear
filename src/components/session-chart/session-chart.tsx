import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";

import { ThemeType } from '../../styles';

type SessionChartProps = {
  data: number[][]
  theme:  ThemeType
}

const lineColors = ['rgba(210,77,90,1)','rgba(156,209,72,1)','rgba(178,143,220,1)']



export const SessionChart = ({data, theme}: SessionChartProps) => {
  const {colors}= theme
  return (
    <LineChart
      withShadow={false}
      style={{marginBottom:-40, marginLeft:-20}}
      data={{
        labels:["time"],
        datasets: data.map((d,i)=>{
          return {
            data: d,
            color:() => lineColors[i]
          }
        })
      }}
      formatYLabel={(v)=> {
        if (v==='NaN') return '0g'
        return parseFloat(v).toFixed(1)+'g' 
      }}
      formatXLabel={()=>''}
      withVerticalLines={false}
      // withHorizontalLines={false}
      withDots={false}
      withInnerLines={false}
      width={Dimensions.get("window").width} // moving to middle cuz i got rid of y labels
      bezier
      height={220}
      chartConfig={{
        backgroundGradientFromOpacity: 0,
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional,
      }}
    />
  )
}