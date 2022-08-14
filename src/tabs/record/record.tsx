
import React,{useEffect, useState} from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {RecordParamList} from './record-tab'
import {View} from 'react-native'
import {SessionStreamer} from './session-streamer'
import { DataStore, Predicates, SortDirection } from 'aws-amplify';
import { Session } from '../../models';
import { SessionList } from '../../pages/sessions-list/sessions-list';


type RecordProps = NativeStackScreenProps<RecordParamList, 'Record'>

export const Record = (props:RecordProps) => {
  const [sessions, setsessions] = useState<Session[]>([])
  useEffect(() => {
    const subscription = DataStore.observeQuery(Session, Predicates.ALL, {
      sort: s => s.updatedAt(SortDirection.DESCENDING),
      }
    ).subscribe(snapshot => {
      const { items, isSynced } = snapshot
      setsessions(items.slice(0,10))
    });
    return () => subscription.unsubscribe()
  }, [])
  
  return (
    <View style={{flex:1}}>
      <SessionStreamer {...props}/>
      <SessionList 
        sessions={sessions}
        navigate={(s)=> {
          props.navigation.navigate('Session', {id:s.id})
        }}
      />
    </View>
  )
}