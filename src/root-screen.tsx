import 'react-native-gesture-handler';
import React, { useContext, useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
// @ts-ignore
import { AmplifyButton } from 'aws-amplify-react-native';
import { AuthContext } from './pages/auth/auth-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import DeviceContext from './device/device-context';
import { MetaWearState, DefaultMetaWearState } from './device/types';
import { getStyles, StyleContext } from './styles/styles';
import { RecordRoot } from './tabs/record/record-tab';
import { withTheme } from 'react-native-paper';
import { getTheme, ThemeType } from './styles/theme';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthParamsList } from '.';
import * as Metawear from './device/ios/metawear-ios';
import { useFocusEffect } from '@react-navigation/native';
import { DeviceRoot } from './tabs/device/device-tab';
import { Appearance } from 'react-native';
import { mockMetaWear } from './device/mock/metawear-mock';

type SignOutButtonProps = { onPress: () => void };
export const SignOutButton = ({ onPress }: SignOutButtonProps) => {
  const context = useContext(AuthContext);
  return (
    <AmplifyButton
      onPress={async () => {
        await Auth.signOut();
        context.setauthState('signedOut');
        onPress();
      }}
      text={'sign out'}
    />
  );
};

export type TabParamList = {
  'record-tab': {};
  'device-tab': {};
};
export const Icon = (icon: string) => {
  return (size: number, color: string) => (
    <Ionicons name={icon} size={size} color={color} />
  );
};
export const tabIcons: { [K in keyof TabParamList]: any } = {
  'record-tab': Icon('log-in-outline'),
  'device-tab': Icon('ios-list'),
};
const Tab = createBottomTabNavigator<TabParamList>();

type MainScreenProps = StackScreenProps<AuthParamsList, 'MainScreen'> & {
  theme: ThemeType;
};

mockMetaWear()

export const RootScreen = withTheme(
  ({ theme, navigation }: MainScreenProps) => {
    const authContext = useContext(AuthContext);
    const [device, setdevice] = useState<MetaWearState>(
      DefaultMetaWearState,
    );
    const [styles, setStyles] = useState(getStyles(getTheme('light')));

    useEffect(() => {
      Appearance.addChangeListener(({ colorScheme }) => {
        setStyles(getStyles(getTheme(colorScheme)));
      });
    }, []);

    useFocusEffect(
      React.useCallback(() => {
        Metawear.onStateUpdate((state: MetaWearState) => {
          setdevice((v) => ({ ...v, ...state }));
        });
        Metawear.connectToRemembered();
      }, []),
    );


    if (authContext.authState !== 'signedIn') {
      return (
        <SignOutButton onPress={() => navigation.navigate('AuthScreen', {})} />
      );
    }

    return (
      <DeviceContext.Provider
        value={[
          device,
          (v: MetaWearState) => {
            setdevice((d) => ({ ...d, ...v }));
          },
        ]}
      >
        <StyleContext.Provider value={styles}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarInactiveTintColor: theme.colors.text,
              tabBarIcon: ({ color, size }) => {
                return tabIcons[route.name](size, color);
              },
              headerStyle: styles.TabHeaderContent,
              tabBarActiveTintColor: theme.colors.primary,
              tabBarStyle: {
                backgroundColor: theme.colors.defaultBackgroundColor,
              },
              headerShown: false,
              contentStyle: styles.navigatorContent,
            })}
          >
            <Tab.Screen
              name="record-tab"
              options={{ tabBarLabel: 'Record' }}
              component={RecordRoot}
            />
            <Tab.Screen
              name="device-tab"
              options={{ tabBarLabel: 'Settings' }}
              component={DeviceRoot}
            />
          </Tab.Navigator>
        </StyleContext.Provider>
      </DeviceContext.Provider>
    );
  },
);
