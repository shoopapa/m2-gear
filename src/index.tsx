import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';

import { AuthContext } from './pages/auth/auth-context';
import { RootScreen } from './root-screen';
import { AuthScreen } from './pages/auth/authScreen';
import { useTheme } from './styles/theme';

export type AuthParamsList = {
  AuthScreen: {};
  MainScreen: {};
};

const Stack = createStackNavigator<AuthParamsList>();

export const AppWithAuth = () => {
  const [authState, setauthState] = useState<string>('');
  const [authData, setauthData] = useState(null);
  const theme = useTheme();

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AuthContext.Provider
          value={{
            authState,
            authData,
            setauthState,
            setauthData,
          }}
        >
          <Stack.Navigator>
            <Stack.Screen
              name="AuthScreen"
              component={AuthScreen}
              options={{ title: 'Sign in', headerLeft: () => null }}
            />
            <Stack.Screen
              name="MainScreen"
              component={RootScreen}
              options={{
                headerShown: false,
                headerLeft: () => null,
                gestureEnabled: false,
              }}
            />
          </Stack.Navigator>
        </AuthContext.Provider>
      </NavigationContainer>
    </PaperProvider>
  );
};
