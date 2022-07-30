import 'react-native-gesture-handler';
import React, {useContext, useState} from 'react';
import {Auth} from 'aws-amplify';
// @ts-ignore
import {AmplifyButton} from 'aws-amplify-react-native';
import AuthContext from './auth/auth-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Device from './tabs/device/device';
import DeviceContext from './device/ios/device-context';
import { MetaWearState } from './device/ios/metawear';

import { RecordRoot } from './tabs/record/index'
import { TagsScreen } from './tabs/tags/tags-screen';

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
            } else if (route.name === 'Record') {
              iconName = 'camera'
            } else if (route.name === 'Tags') {
              iconName = 'pricetag'
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown:false
        })}
      >
        <Tab.Screen name="Record" component={RecordRoot} />
        <Tab.Screen name="Tags" options={{headerShown: false}} component={TagsScreen} />
        <Tab.Screen name="Device" component={Device} />
      </Tab.Navigator>
    </DeviceContext.Provider>
  );
}

export default MainScreen;
