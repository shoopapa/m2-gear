
import React from 'react'
import { Tag } from '../../models'
import { Text} from 'react-native'
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import {Record} from './record'
import { SessionPage } from '../../pages/session/session';

export type RecordParamList = {
  Record: {};
  Session: {id:string};
};

const Stack = createNativeStackNavigator<RecordParamList>();

export const RecordRoot = () => {
  return (
    <Stack.Navigator initialRouteName="Record" >
      <Stack.Screen name="Record" component={Record} />
      <Stack.Screen name="Session" component={SessionPage}/>
    </Stack.Navigator>
  )
}