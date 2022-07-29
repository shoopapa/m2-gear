import React from 'react'
import { DataStore, API } from 'aws-amplify'
import { useEffect, useState } from 'react'
import { Tag } from '../../models'
import { View, Text} from 'react-native'
import globalStyles, { ThemeType } from '../../styles';
import { Button } from 'react-native-paper'
import { createNativeStackNavigator,NativeStackHeaderProps,NativeStackScreenProps } from '@react-navigation/native-stack';
import { SessionsForTag, SessionsForTagQuery } from '../../custom-grahql/query'
import { Session } from '../../API'
import session from '../session/session'


type RootStackParamList = {
  Tags: {tags: Tag[]};
  Tag: {tag: Tag};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const TagRoute = ( {route}:NativeStackScreenProps<RootStackParamList, 'Tag'>) =>{
  const tag = route.params.tag
  const [getTagData, setgetTagData] = useState<SessionsForTagQuery['getTag']>({})
  
  const update = async () => {
    try{
      const res = await (API.graphql({query: SessionsForTag, variables:{tag: tag.id} }) as Promise<{data:SessionsForTagQuery}>)
      const getTagData = res.data.getTag
      if (getTagData) {
        setgetTagData(getTagData)
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
    <View style={globalStyles.container}>
      {getTagData.sessions?.items.map(s=>{
        const time =new Date(parseInt( s?.session._lastChangedAt ?? ""))
        return (
          <Button key={s?.session.id}>
            Session: { time.toLocaleString('en-us', {weekday:'short', month:'numeric', day:'numeric',year:'numeric', hour:'2-digit', minute:'2-digit' })  }
          </Button>
        )
      })}
    </View>
  )
}

type TagsRootProp = NativeStackScreenProps<RootStackParamList, 'Tags'>

const TagsRoute = ({route, navigation}: TagsRootProp) => {
  const tags = route.params.tags
  return (
    <View style={globalStyles.container}>
      {tags.map((t,i) => {
       return (
        //  <Text key={t.name}>hi</Text>
         <Button onPress={()=> navigation.navigate('Tag', {tag:t})}>{t.name}</Button>
       )
     })}
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
    console.log(tags)
    settags( Object.values(tags) )
  }

  useEffect(() => {
    update()
  }, [])

  if (tags.length == 0) {
    return ( <Text> no </Text> )
  }

  return (
    // <View style={globalStyles.container}>
    <Stack.Navigator initialRouteName="Tags" >
      <Stack.Screen name="Tags" component={TagsRoute} initialParams={{tags}} />
      <Stack.Screen name="Tag" component={TagRoute} />
    </Stack.Navigator>
    // </View>
  )
}
