import React, { useContext, useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import {View, Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import * as MetaWear from '../../device/ios/metawear'

import globalStyles, { ThemeType } from '../../styles';
import {Button, Drawer,withTheme } from 'react-native-paper';
import DeviceContext from '../../device/ios/device-context';
import { Tag } from '../../models'
import { Text} from "react-native";

import { SelectableTag, saveSession } from './save-session';
import { SaveModal } from './save-modal';


interface SessionScreenProps {
  theme: ThemeType
}

const SessionScreen = ({theme}: SessionScreenProps) => {
  const {colors} = theme
  const device = useContext(DeviceContext);
  const [acc, setacc] = useState<number[][]>([[0],[0],[0]])
  const [gyro, setgyro] = useState<number[][]>([[0],[0],[0]])
  const [tags, settags] = useState<Tag[]>([])
  const [isStreaming, setisStreaming] = useState(false)
  const [streamingDataExists, setstreamingDataExists] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [viewingData, setViewingData] = useState<number[]>([])


  useEffect(() => {
    setstreamingDataExists(acc[0].length > 0)
  }, [acc])


  const gyroEvent = (g:number[]) => {
    setgyro(v => ([
      [...v[0], g[0] ],
      [...v[1], g[1] ],
      [...v[2], g[2] ],
    ]))
  }

  const accEvent = (a:number[]) => {
    setViewingData(v => {
      v.length > 100? v.shift() : null
      return [...v, a[0]]
    })
    setacc(v => ([
      [...v[0], a[0] ],
      [...v[1], a[1] ],
      [...v[2], a[2] ],
    ]))
  }

  
  const onSave = (selectedTags:{[key:string]: Boolean}) => {
    saveSession(acc, gyro, tags.filter(t => t.id in selectedTags), 0, 25)
    setModalVisible(false)
  }

  return (
    <View style={globalStyles.container}>
      <LineChart
        style={globalStyles.chartContainer}
        withShadow={false}
        data={{
          labels:["time"],
          datasets: [{
            data:viewingData,
            color: v => {
              return colors.primaryByOpacity(v)
            }
          }]
        }}
        formatYLabel={(v)=> parseFloat(v).toFixed(1)+'g'}
        formatXLabel={()=>''}
        withVerticalLines={false}
        withHorizontalLines={false}
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
    <Drawer.Section title="Controls" style={{width: '100%', padding:20}} >
      <View style={{flexDirection:'row', justifyContent:'space-between'}} >
        <Button
          mode="contained"
          disabled={!streamingDataExists}
          dark={false}
          style={{backgroundColor: colors.gray, margin: '2%'}}
          onPress={ () => {
            if (isStreaming) {
              MetaWear.stopStream();
              setisStreaming(false)
            } else {
              setacc([[],[],[]])
              setgyro([[],[],[]])
            }
          }}>
          {isStreaming? 'Stop': 'Reset'}
        </Button>
        <Button
          disabled={(!device.device?.isConnected || isStreaming)} // not steaming and device connected
          mode="contained"
          style={{backgroundColor: colors.primary, margin: '2%'}}
          onPress={async () => {
            MetaWear.onAccData(accEvent)
            MetaWear.onGyroData(gyroEvent)
            MetaWear.startStream()
            setisStreaming(true)
          }}
        >
          {acc[0].length > 0? 'Resume': 'Start'}
        </Button>
      </View>
      {  !(streamingDataExists && !isStreaming)? null :
        <Button
          mode="contained"
          style={{backgroundColor: colors.success, margin: '2%'}}
          disabled={acc[0].length == 0}
          onPress={async () => setModalVisible(true)}
        >
            Save
        </Button>
      }
    </Drawer.Section>
    <SaveModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        theme={theme}
        onSave={onSave}
    />
    </View>
  );
};


export default withTheme(SessionScreen)
