import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Device } from './device';
import { StyleContext } from '../../styles/styles';
import { ThemeType } from '../../styles/theme';
import { withTheme } from 'react-native-paper';

export type DeviceParamList = {
  Device: {};
};

const Stack = createNativeStackNavigator<DeviceParamList>();

export const DeviceRoot = withTheme(({theme}: {theme:ThemeType}) => {
  const styles = useContext(StyleContext)

  return (
    <Stack.Navigator
      initialRouteName="Device"

      screenOptions={{
        headerTintColor: theme.colors.text,
        contentStyle: styles.navigatorContent,
        headerStyle: styles.TabHeaderContent,
      }}
    >
      <Stack.Screen name="Device" component={Device} />
    </Stack.Navigator>
  );
});
