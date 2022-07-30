
import React from 'react'
import { Tag } from '../../models'
import { Text} from 'react-native'
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import {Record} from './record'
type SessoinStackParamList = {
  Record: {tags: Tag[]};
  Session: {tag: Tag};
};

const Stack = createNativeStackNavigator<SessoinStackParamList>();

export const RecordRoot = () => {
  return (
    <Stack.Navigator initialRouteName="Record" >
      <Stack.Screen name="Record" component={Record} />
      <Stack.Screen name="Session" component={()=>(<Text>Record</Text>)}/>
    </Stack.Navigator>
  )
}