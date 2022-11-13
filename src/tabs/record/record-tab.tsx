import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Record } from './record';
import { SessionPage } from '../../pages/session/session';
import { StyleContext } from '../../styles/styles';
import { ThemeType } from '../../styles/theme';
import { withTheme } from 'react-native-paper';

export type RecordParamList = {
  Record: {};
  Session: { id: string };
};


const Stack = createNativeStackNavigator<RecordParamList>();
export type RecordRootProps = {theme:ThemeType}

export const RecordRoot = withTheme(({theme}: RecordRootProps) => {
  const styles = useContext(StyleContext)

  return (
    <Stack.Navigator
      initialRouteName="Record"
      screenOptions={{
        headerTintColor: theme.colors.text,
        contentStyle: styles.navigatorContent,
        headerStyle: styles.TabHeaderContent,
      }}

    >
      <Stack.Screen name="Record" component={Record} />
      <Stack.Screen name="Session" component={SessionPage} />
    </Stack.Navigator>
  );
});
