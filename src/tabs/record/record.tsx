
import React from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {RecordParamList} from './index'
import {View} from 'react-native'
import {SessionStreamer} from './session-streamer'
import { RecentSessions } from './recent-sessions';

type RecordProps = NativeStackScreenProps<RecordParamList, 'Record'>

export const Record = (props:RecordProps) => {
  return (
    <View style={{flex:1,}}>
      <SessionStreamer {...props}/>
      <RecentSessions {...props}/>
    </View>
  )
}