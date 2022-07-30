import React, { useEffect,useState } from 'react'
import { Text, ScrollView } from 'react-native'
import {ThemeType} from '../../styles'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RecordParamList } from './index'
import { DataStore, Predicates, SortDirection} from 'aws-amplify';
import { Session } from '../../models';
import ReactTimeAgo from 'react-time-ago'


import {Button, Drawer,withTheme } from 'react-native-paper';


type RecentSessionsProps = { theme: ThemeType } & NativeStackScreenProps<RecordParamList,'Record'>

const RecentSessionsWithoutTheme = ({route}: RecentSessionsProps) => {
  const [sessions, setsessions] = useState<Session[]>([])
  
  useEffect(() => {
    const subscription = DataStore.observeQuery(Session,Predicates.ALL, {
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
      <Text>LOADING</Text>
    )
  }
  return (
    <ScrollView 
      style={{height:'1%', backgroundColor:'white'}}
     >  
     <Drawer.Section title='10 Most Recent Sessions'>
      {sessions.map((s)=>{
        if (s.updatedAt){
          return (
            <Button>
              <ReactTimeAgo date={new Date(s.updatedAt)} locale="en-US" component={({children})=>(<Text>{children}</Text>)}/>
            </Button>
          )
        }
      })}
     </Drawer.Section>
    </ScrollView>
  )
}

export const RecentSessions = withTheme(RecentSessionsWithoutTheme)