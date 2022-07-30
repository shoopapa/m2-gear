import React, { useEffect,useState } from 'react'
import { Text, ScrollView, View } from 'react-native'
import {globalStyles, ThemeType} from '../../styles'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RecordParamList } from './index'
import { DataStore, Predicates, SortDirection} from 'aws-amplify';
import { Session } from '../../models';
import ReactTimeAgo from 'react-time-ago'


import {Button, Drawer,withTheme, List, ActivityIndicator } from 'react-native-paper';
import { timeAgo } from '../../utils/time-ago';

type RecentSessionsProps = { theme: ThemeType } & NativeStackScreenProps<RecordParamList,'Record'>

const RecentSessionsWithoutTheme = ({theme, navigation}: RecentSessionsProps) => {
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
  
  if (!sessions || sessions.length == 0){
    return (
      <View style={globalStyles.container}>    
        <ActivityIndicator animating={true} color={theme.colors.primary} />
      </View> 
    )
  }
    
  return (
    <ScrollView 
      style={{height:'1%', backgroundColor:'white'}}
     >  
     <List.Section title='10 Most Recent Sessions'>
      {sessions.map((s)=>{
        if (s.updatedAt){
          const t = timeAgo.format(new Date(s.updatedAt))
          return (
            <List.Item
              onPress={()=>{
                navigation.navigate('Session', {id:s.id})
              }}
              title={s.id}
              description={t}
              left={props => <List.Icon style={{padding:0, margin:0}} icon="run" />}
            />
          )
        }
      })}
     </List.Section>
    </ScrollView>
  )
}

export const RecentSessions = withTheme(RecentSessionsWithoutTheme)