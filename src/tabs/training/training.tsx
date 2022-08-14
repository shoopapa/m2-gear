

import React, { useContext, useState, useEffect } from 'react';
import {Pressable, View} from 'react-native';
import * as MetaWear from '../../device/ios/metawear'

import {globalStyles, ThemeType } from '../../styles';
import { ActivityIndicator, Text, withTheme } from 'react-native-paper';

import { SessionChart } from '../../components/session-chart/session-chart';
import { Session } from '../../models';
import { DataStore, SortDirection } from 'aws-amplify';
import { SessionList } from '../../pages/sessions-list/sessions-list';
import { TrainingParamList } from './training-tab';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type TrainingProps = NativeStackScreenProps<TrainingParamList, 'Training'> & {theme: ThemeType}

export const Training = withTheme(({theme, route, navigation}: TrainingProps) => {
  const {colors} = theme
  const {groupid} = route.params
  const [viewingData, setViewingData] = useState<number[]>([])
  const [acc, setacc] = useState<number[][]>([[],[],[]])
  const [gyro, setgyro] = useState<number[][]>([[],[],[]])
  const [sessions, setsessions] = useState<Session[]>([])
  
  if (groupid === undefined){
    return (
      <View style={globalStyles.container}>    
        <ActivityIndicator animating={true} color={theme.colors.primary} />
      </View> 
    )
  }
  
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
  
  useEffect(() => {
    MetaWear.onAccData(accEvent)
    MetaWear.onGyroData(gyroEvent)
    const subscription = DataStore.observeQuery(Session, s=> s.sessionGroupSessionsId('eq', groupid), {
      sort: s => s.updatedAt(SortDirection.DESCENDING),
      }
    ).subscribe(snapshot => {
      const { items, isSynced } = snapshot
      setsessions(items.slice(0,10))
    });
    return () => subscription.unsubscribe()
  }, [])
  
  const onRelease = async () => {
    MetaWear.stopStream() 
    const input = new Session({
      accerationX:  acc[0],
      accerationY:  acc[1],
      accerationZ:  acc[2],
      gyroX:  gyro[0],
      gyroY:  gyro[1],
      gyroZ:  gyro[2],
      streamingStarted: 0,
      streamingFreqency: 25,
      sessionGroupSessionsId: groupid
    })
    await DataStore.save(input)
  
    setacc([[],[],[]])
    setgyro([[],[],[]])
    setViewingData([])

  }
  
  return (
    <View style={{...globalStyles.container}}>
      <Text>Press and Hold to Record Move</Text>
      <Pressable
        // style={{backgroundColor:'rgba(20, 20, 200,.1)'}}
        disabled={false}
        onPressIn={ () => MetaWear.startStream() }
        onPressOut={onRelease}
      >
        <SessionChart
          data={[viewingData]}
          theme={theme}
        />
      </Pressable>
      <View style={{flex:1, width:'100%'}}>
        <SessionList 
          sessions={sessions}
          navigate={(s)=> {
            navigation.navigate('Session', {id:s.id})
          }}
        />
      </View>
    </View>
  );
});



