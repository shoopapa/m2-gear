
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SessionPage } from '../../pages/session/session';
import { Training } from './training';
import { CreateGroup } from './create-group';

export type TrainingParamList = {
  CreateGroup: {}
  Training: {groupid?: string};
  Session: {id:string};
};

const Stack = createNativeStackNavigator<TrainingParamList>();

export const TrainingTab = () => {
  return (
    <Stack.Navigator initialRouteName="CreateGroup" screenOptions={{
      headerShown:false
    }} >
      <Stack.Screen name="CreateGroup" component={CreateGroup} />
      <Stack.Screen name="Training" component={Training} />
      <Stack.Screen name="Session" component={SessionPage}/>
    </Stack.Navigator>
  )
}