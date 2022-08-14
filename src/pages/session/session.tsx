import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RecordParamList } from '../../tabs/record/record-tab';
import { ActivityIndicator, Button, Text, withTheme } from 'react-native-paper';
import { globalStyles, ThemeType } from '../../styles';
import { DataStore } from 'aws-amplify';
import { Session } from '../../models';
import { View } from 'react-native';
import { SessionChart } from '../../components/session-chart/session-chart';
import ReactTimeAgo from 'react-time-ago'

const getHighestOfArray = (arr:number[]):number => {
  const max = Math.max(...arr)
  const min = Math.min(...arr)
  if( Math.abs(max) > Math.abs(min)) {
    return Math.round(max*100,)/100
  } 
  return Math.round(min*100,)/100
}

type RecordProps = {theme: ThemeType} & NativeStackScreenProps<RecordParamList, 'Session'>

export const SessionPage = withTheme(({route, navigation, theme}:RecordProps) => {
  const {colors} = theme
  const {id}= route.params
  const [session, setsession] = useState<Session | null>(null)
  
  useEffect(() => {
    console.log('init session', id)
    const sub = DataStore.observeQuery(Session,p=>p.id('eq',id)).subscribe(snap=>{
      const { items, isSynced } = snap;
      setsession(items[0])
    })
  
    return () => {
      sub.unsubscribe()
    }
  }, [])
  
  if (session === null) {
    return (
      <View style={globalStyles.container}>    
       <ActivityIndicator animating={true} color={theme.colors.primary} />
     </View> 
    )
  }
  
  return (
    <View style={globalStyles.container}>    
      <SessionChart
        data={[session.accerationX, session.accerationY, session.accerationZ]}
        theme={theme}
      />
      <ReactTimeAgo date={new Date(session.updatedAt??"")} locale="en-US" component={({children})=>(<Text>Session recorded {children} ago</Text>)}/>
      <Text>
        Session ID: {session.id}
      </Text>
      <Text>
        Streaming Freqency: {session.streamingFreqency}Hz
      </Text>
      <Text>
        Peak X Acceration: {getHighestOfArray(session.accerationX)}g
      </Text>
      <Text>
        Peak Y Acceration: {getHighestOfArray(session.accerationY)}g
      </Text>
      <Text>
        Peak Y Acceration: {getHighestOfArray(session.accerationZ)}g
      </Text>
      <Button
        mode='contained'
        color={colors.error}
        onPress={()=>{
          DataStore.delete(session)
          navigation.goBack()
        }}
      >
        Delete Session
      </Button>
    </View>
  )
})
