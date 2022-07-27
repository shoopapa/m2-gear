import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';

import AuthContext from './auth/auth-context';
import MainScreen from './mainScreen';
import AuthScreen from './auth/authScreen';
import {theme} from './styles';

const Stack = createStackNavigator();

function AppWithAuth() {
  const [authState, setauthState] = useState(null);
  const [authData, setauthData] = useState(null);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AuthContext.Provider
          value={{
            authState,
            authData,
            setauthState,
            setauthData,
          }}>
          <Stack.Navigator>
            <Stack.Screen
              name="AuthScreen"
              component={AuthScreen}
              options={{title: 'Sign in', headerLeft: () => null}}
            />
            <Stack.Screen
              name="MainScreen"
              component={MainScreen}
              options={{headerShown: false, headerLeft: () => null}}
            />
          </Stack.Navigator>
        </AuthContext.Provider>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default AppWithAuth;
