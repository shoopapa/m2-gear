import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { globalStyles } from '../../styles';
import { Device } from './device';

export type DeviceParamList = {
  Device: {};
};

const Stack = createNativeStackNavigator<DeviceParamList>();

export const RecordRoot = () => {
  return (
    <Stack.Navigator
      initialRouteName="Device"
      screenOptions={{ contentStyle: globalStyles.navigatorContent }}
    >
      <Stack.Screen name="Device" component={Device} />
    </Stack.Navigator>
  );
};
