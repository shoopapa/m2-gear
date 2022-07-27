/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {Auth, DataStore} from 'aws-amplify';
import {View, NativeModules, NativeAppEventEmitter} from 'react-native';
import styles from '../../styles';
import AuthContext from '../../auth/auth-context';
import {Text, Button, withTheme, Drawer, Appbar} from 'react-native-paper';
import DeviceContext, {InitDeviceContext} from './device-context';
import {ActivityIndicator} from 'react-native-paper';
//TODO: create npm package for metawear

interface ConnectProps {
  deviceContext: InitDeviceContext;
  colors: any;
}
const Connect = ({deviceContext, colors}: ConnectProps) => {
  const [blinking, setblinking] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  if (deviceContext.device === null) {
    return <ActivityIndicator animating={true} color={colors.primary} />;
  }
  if (isLoading === true) {
    return <ActivityIndicator animating={true} color={colors.primary} />;
  }

  if (deviceContext.device.isConnected === false) {
    return (
      <Button
        mode="contained"
        style={{backgroundColor: colors.success, margin: '2%'}}
        icon="bluetooth"
        onPress={async () => {
          setisLoading(true);
          const p = await NativeModules.MetaWearDevice.connect();
          deviceContext.setdevice(JSON.parse(p));
          console.log(deviceContext.device);
          setisLoading(false);
        }}>
        Connect
      </Button>
    );
  }

  if (deviceContext.device.isConnected === true) {
    return (
      <>
        <Button
          mode="contained"
          style={{backgroundColor: colors.accent, margin: '2%'}}
          icon="lightbulb-on"
          onPress={async () => {
            setblinking(true);
            await NativeModules.MetaWearDevice.blinkLED();
            setblinking(false);
          }}>
          Blink
        </Button>
        <Button
          mode="contained"
          disabled={blinking}
          style={{backgroundColor: colors.accent, margin: '2%'}}
          icon="bluetooth-off"
          onPress={async () => {
            const p = await NativeModules.MetaWearDevice.disconnect();
            deviceContext.setdevice(JSON.parse(p));
          }}>
          Disconnect
        </Button>
      </>
    );
  }

  return null;
};

const Device = ({navigation, theme}: any) => {
  const {colors} = theme;
  const authContext = useContext(AuthContext);
  const deviceContext = useContext(DeviceContext);

  const updateDevice = async () => {
    NativeAppEventEmitter.addListener('onDisconect', (body: string) => {
      deviceContext.setdevice(JSON.parse(body));
    });
    const x = await NativeModules.MetaWearDevice.getState();
    console.log(x);
    if (deviceContext.setdevice !== null) {
      deviceContext.setdevice(JSON.parse(x));
    }
    console.log('updating', deviceContext.device);
  };

  React.useEffect(() => {
    updateDevice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Appbar.Header style={{width: '100%'}}>
        <Appbar.Content title="Settings" />
      </Appbar.Header>
      <Drawer.Section title="Device Info" style={{width: '100%'}}>
        <Drawer.Item
          style={{backgroundColor: colors.gray}}
          icon="bluetooth-connect"
          label="Status"
          right={() => (
            <Text>
              {deviceContext.device?.isConnected ? 'Connected' : 'Disconnected'}
            </Text>
          )}
        />
        <Drawer.Item
          style={{backgroundColor: colors.gray}}
          icon="database"
          label="Mac Address"
          right={() => <Text>{deviceContext.device?.macAdress}</Text>}
        />
        <Drawer.Item
          style={{backgroundColor: colors.gray}}
          icon="battery"
          label="Battery"
          right={() => <Text>{deviceContext.device?.batteryPercent}</Text>}
        />
      </Drawer.Section>
      <Drawer.Section title="Device Options" style={{width: '100%'}}>
        <Connect colors={colors} deviceContext={deviceContext} />
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
        <Button
          mode="contained"
          style={{backgroundColor: colors.error, margin: '2%'}}
          onPress={async () => {
            const p = await NativeModules.MetaWearDevice.getState();
            console.log(p);
            console.log(deviceContext);
          }}>
          state
        </Button>
      </Drawer.Section>
    </View>
  );
};

export default withTheme(Device);
