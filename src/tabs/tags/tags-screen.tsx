import React from 'react'
import { DataStore, API } from 'aws-amplify'
import { useEffect, useState } from 'react'
import { Tag } from '../../models'
import { View, Text} from 'react-native'
import {globalStyles} from '../../styles';
import { Button, List } from 'react-native-paper'
import { createNativeStackNavigator,NativeStackScreenProps } from '@react-navigation/native-stack';
import { SessionsForTag, SessionsForTagQuery } from '../../custom-grahql/query'
import { SessionPage } from '../../pages/session/session'
import { timeAgo } from '../../utils/time-ago'


type RootStackParamList = {
  Tags: {tags: Tag[]};
  Tag: {tag: Tag};
  Session: {id: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const TagRoute = ( {route, navigation}:NativeStackScreenProps<RootStackParamList, 'Tag'>) =>{
  const tag = route.params.tag
  const [getTagData, setgetTagData] = useState<SessionsForTagQuery['getTag']>({})
  
  const update = async () => {
    try{
      const res = await (API.graphql({query: SessionsForTag, variables:{tag: tag.id} }) as Promise<{data:SessionsForTagQuery}>)
      const getTagData = res.data.getTag
      if (getTagData) {
        setgetTagData(getTagData)
      } else {
        throw new Error('no sessions to show!')
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    update()
  }, [])
  
  if (!getTagData || Object.keys(getTagData).length === 0 ){
    return( 
      <View style={globalStyles.container}> 
        <Text> Loading </Text> 
      </View>
    )
  }
  
  return (
    <View style={{...globalStyles.container}}>
      <List.Section style={{width:'100%'}}>
        {getTagData.sessions?.items.map(s=>{
          const time =new Date(parseInt( s?.session._lastChangedAt ?? ""))
          let t = time.toLocaleString('en-us', {weekday:'short', month:'numeric', day:'numeric',year:'numeric', hour:'2-digit', minute:'2-digit' })
          if ((Date.now() - time.getTime()) < 24*60*60*1000) {//less than a day show relative 
            t = timeAgo.format(time)
          } 
          return (
            <List.Item
              onPress={()=>{
                navigation.navigate('Session', {id:s?.session.id??''})
              }}
              title={s?.session.id}
              description={t}
              left={props => <List.Icon style={{padding:0, margin:0}} icon="run" />}
            />
          )
        })}
      </List.Section>
    </View>
  )
}

type TagsRootProp = NativeStackScreenProps<RootStackParamList, 'Tags'>

const TagsRoute = ({route, navigation}: TagsRootProp) => {
  const tags = route.params.tags
  return (
    <View style={globalStyles.container}>
      <List.Section style={{width:'100%'}}>
        {tags.map((t,i) => {
          return (
            <List.Item
              key={t.id}
              onPress={()=>{
                navigation.navigate('Tag', {tag: t})
              }}
              title={t.name}
              // description={t.name}
              left={props => <List.Icon style={{padding:0, margin:0}} icon="tag-outline" />}
            />
          )
        })}
      </List.Section>
    </View>
  )
}

export const TagsScreen = () => {
  const [tags, settags] = useState<Tag[]>([])

  const update = async () => {
    const tags: {[key:string]:Tag} = {};
    (await DataStore.query(Tag)).forEach(t => {
      if (t.name in tags) return
      tags[t.name] = t
    })
    settags( Object.values(tags) )
  }

  useEffect(() => {
    update()
  }, [])

  if (tags.length == 0) {
    return ( <Text> no </Text> )
  }

  return (
    <Stack.Navigator initialRouteName="Tags" >
      <Stack.Screen name="Tags" component={TagsRoute} initialParams={{tags}} />
      <Stack.Screen name="Tag" component={TagRoute} />
      <Stack.Screen name="Session" component={SessionPage} />
    </Stack.Navigator>
  )
}
