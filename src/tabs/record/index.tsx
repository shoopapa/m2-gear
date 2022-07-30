
import React from 'react'
import { Tag } from '../../models'
import { Text} from 'react-native'
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import {Record} from './record'
import { RecentSessions } from './recent-sessions';

export type RecordParamList = {
  Record: {tags: Tag[]};
  'Recent Sessions': {tag: Tag};
};

const Stack = createNativeStackNavigator<RecordParamList>();

export const RecordRoot = () => {
  return (
    <Stack.Navigator initialRouteName="Record" >
      <Stack.Screen name="Record" component={Record} />
      <Stack.Screen name="Recent Sessions" component={RecentSessions}/>
    </Stack.Navigator>
  )
}