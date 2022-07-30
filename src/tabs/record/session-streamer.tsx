import React, { useContext, useState, useEffect } from 'react';
import {View} from 'react-native';
import * as MetaWear from '../../device/ios/metawear'

import globalStyles, { ThemeType } from '../../styles';
import {Button, Drawer,withTheme } from 'react-native-paper';
import DeviceContext from '../../device/ios/device-context';
import { Tag } from '../../models'

import { saveSession } from './utils/save-session';
import { SaveModal } from './save-modal';
import { SessionChart } from '../../components/session-chart/session-chart';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {RecordParamList} from './index'

type SessionScreenProps = { theme: ThemeType } & NativeStackScreenProps<RecordParamList,'Record'>

const SessionStreamerWithoutTheme = ({theme}: SessionScreenProps) => {
  const {colors} = theme
  const device = useContext(DeviceContext);
  const [acc, setacc] = useState<number[][]>([[],[],[]])
  const [gyro, setgyro] = useState<number[][]>([[],[],[]])
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

  
  const onSave = (tags:Tag[], selectedTags:{[key:string]: Boolean}) => {
    saveSession(acc, gyro, tags.filter(t => t.id in selectedTags), 0, 25)
    setModalVisible(false)
  }

  return (
    <View style={{...globalStyles.container}}>
      <SessionChart
        data={viewingData}
        theme={theme}
      />
    <Drawer.Section title="Controls" style={{width: '100%', paddingHorizontal:20}} >
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
              setViewingData([])
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
        <Button
          mode="contained"
          style={{backgroundColor: colors.success, margin: '2%'}}
          disabled={!(streamingDataExists && !isStreaming)}
          onPress={async () => setModalVisible(true)}
        >
          Save
        </Button>
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


export const SessionStreamer = withTheme(SessionStreamerWithoutTheme)
