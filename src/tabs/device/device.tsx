/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {Auth, DataStore} from 'aws-amplify';
import {View} from 'react-native';
import styles, { ThemeType } from '../../styles';
import * as MetaWear from '../../device/ios/metawear'
import AuthContext from '../../auth/auth-context';
import {Text, Button, withTheme, Drawer} from 'react-native-paper';
import DeviceContext, {InitDeviceContext } from '../../device/ios/device-context';
import {ActivityIndicator} from 'react-native-paper';
//TODO: create npm package for metawear

// const fn = async (time: number, label) => {
// 	await new Promise((res) => setTimeout(res, time));
// 	return label;
// }
interface ConnectProps {
  colors: any;
}

const Connect = ({colors}: ConnectProps ) => {
  const [blinking, setblinking] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const {device, setdevice} = useContext(DeviceContext);

  useEffect(() => {
    setisLoading(true)
    const run = async () => {
      const p = await MetaWear.connectToRemembered()
      setdevice(p)
      setisLoading(false)
    }
    run()
  }, [])

  if (device === null || isLoading === true) {
    return <ActivityIndicator animating={true} color={colors.primary} />;
  }

  if (device?.isConnected === false) {
    return (
      <Button
        mode="contained"
        style={{backgroundColor: colors.success, margin: '2%'}}
        icon="bluetooth"
        onPress={async () => {
          setisLoading(true);
          const p = await MetaWear.connect();
          setdevice(p);
          setisLoading(false);
        }}>
        Connect
      </Button>
    );
  }

  if (device?.isConnected === true) {
    return (
      <>
        <Button
          mode="contained"
          style={{backgroundColor: colors.accent, margin: '2%'}}
          icon="lightbulb-on"
          onPress={async () => {
            setblinking(true);
            await MetaWear.blinkLED()
            setblinking(false);
          }}>
          Blink
        </Button>
        <Button
          mode="contained"
          disabled={blinking}
          style={{backgroundColor: colors.error, margin: '2%'}}
          icon="bluetooth-off"
          onPress={async () => {
            const p = await MetaWear.forget()
            setdevice(p);
          }}>
          Forget
        </Button>
      </>
    );
  }

  return null;
};

interface DeviceProps {
  theme: ThemeType
  navigation: any
}

const Device = ({navigation, theme}: DeviceProps) => {
  const {colors} = theme; // stop using paper provider?
  const authContext = useContext(AuthContext);
  const {device, setdevice} = useContext(DeviceContext);

  return (
    <View style={styles.container}>
      <Drawer.Section title="Device Info" style={{width: '100%'}}>
        <Drawer.Item
          style={{backgroundColor: colors.gray}}
          icon="bluetooth-connect"
          label="Status"
          right={() => (
            <Text>
              {device?.isConnected ? 'Connected' : 'Disconnected'}
            </Text>
          )}
        />
        <Drawer.Item
          style={{backgroundColor: colors.gray}}
          icon="database"
          label="Mac Address"
          right={() => <Text>{device?.macAdress}</Text>}
        />
        <Drawer.Item
          style={{backgroundColor: colors.gray}}
          icon="battery"
          label="Battery"
          right={() => <Text>{device?.batteryPercent}</Text>}
        />
      </Drawer.Section>
      <Drawer.Section title="Device Options" style={{width: '100%'}}>
        <Connect colors={colors} />
      </Drawer.Section>
      <Drawer.Section title="User" style={{width: '100%'}}>
        <Button
          mode="contained"
          style={{backgroundColor: colors.error, margin: '2%'}}
          onPress={async () => {
            await Auth.signOut();
            authContext.setauthState('signedOut');
            navigation.navigate('AuthScreen');
            DataStore.clear();
          }}>
          Sign Out
        </Button>
      </Drawer.Section>
    </View>
  );
};

export default withTheme(Device);
