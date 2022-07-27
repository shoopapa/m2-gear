import React from 'react'
import { DataStore } from 'aws-amplify'
import { useEffect, useState } from 'react'
import { Tag } from '../../models'
import { View, Text} from 'react-native'
import { Button } from 'react-native-paper'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const T = ({t}:any) =>{

  return (
    <Text> hi </Text>
  )

}

const TagsRoot = ({tags}:{tags: Tag[]}) => {
  return (
    <View>
      <Text>hi</Text>
      {tags.map((t,i) => {
        return (
          <Button>{t.name}</Button>
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
    settags( Object.values(tags) )
  }

  useEffect(() => {
    update()
  }, [])

  if (tags.length == 0) {
    return ( <Text> no </Text> )
  }

  return (
    <View>

        <Stack.Navigator initialRouteName={tags[0].name}>
          <Stack.Screen name={'root'} component={TagsRoot} />
          {tags.map((t,i) => {
            return (
              <Stack.Screen name={t.name} component={T} />
              )
            })}
        </Stack.Navigator>
      <Text>sup</Text>
    </View>
  )
}
