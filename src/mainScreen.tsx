import 'react-native-gesture-handler';
import React, {useContext, useState} from 'react';
import {Auth} from 'aws-amplify';
// @ts-ignore
import {AmplifyButton} from 'aws-amplify-react-native';
import AuthContext from './auth/auth-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Device from './pages/device/device';
import SessionScreen from './pages/session/session';
import DeviceContext from './device/ios/device-context';
import { TagsScreen } from './pages/tags/tags-screen';
import { MetaWearState } from './device/ios/metawear';

function SignOutButton({navigation}: any) {
  const context = useContext(AuthContext);
  return (
    <AmplifyButton
      onPress={async () => {
        await Auth.signOut();
        context.setauthState('signedOut');
        navigation.navigate('AuthScreen');
      }}
      text={'sign out'}
    />
  );
}

const Tab = createBottomTabNavigator();


function MainScreen() {
  const authContext = useContext(AuthContext);
  const [device, setdevice] = useState<MetaWearState>({
    batteryPercent: '0',
    isConnected: false,
    macAdress: '',
    streaming: false,
  });

  if (authContext.authState !== 'signedIn') {
    return <SignOutButton />;
  }

  return (
    <DeviceContext.Provider
      value={{device, setdevice}}
    >
      <Tab.Navigator
         screenOptions={({ route }) => ({
          tabBarIcon: ({  color, size }) => {
            let iconName ="";
            if (route.name === 'Device') {
              iconName = 'ios-list'
            } else if (route.name === 'SessionScreen') {
              iconName = 'ios-home'
            } else if (route.name === 'Tags') {
              iconName = 'pricetag '
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="SessionScreen" component={SessionScreen} />
        <Tab.Screen name="Tags" component={TagsScreen} />
        <Tab.Screen name="Device" component={Device} />
      </Tab.Navigator>
    </DeviceContext.Provider>
  );
}

export default MainScreen;
