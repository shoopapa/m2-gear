import React, { useContext, useEffect, useState } from "react";
import { Auth, DataStore, Predicates, SortDirection } from "aws-amplify";
import { View } from "react-native";
import { globalStyles, ThemeType } from "../../styles";
import * as MetaWear from "../../device/ios/metawear";
import { AuthContext } from "../../pages/auth/auth-context";
import { Text, Button, withTheme, Drawer } from "react-native-paper";
import DeviceContext from "../../device/ios/device-context";
import { ActivityIndicator } from "react-native-paper";
import { DeviceParamList } from "./device-tab";
import type { SubNavigatorProps } from "../../types/sub-navigator-props";
interface ConnectProps {
  colors: any;
}

const Connect = ({ colors }: ConnectProps) => {
  const [blinking, setblinking] = useState(false);
  const [device] = useContext(DeviceContext);

  if (device === undefined || device.isScanning === true) {
    return <ActivityIndicator animating={true} color={colors.primary} />;
  }

  if (device?.isConnected === false) {
    return (
      <Button
        mode="contained"
        style={{ backgroundColor: colors.success, margin: "2%" }}
        icon="bluetooth"
        onPress={MetaWear.connect}
      >
        Connect
      </Button>
    );
  }

  if (device?.isConnected === true) {
    return (
      <>
        <Button
          mode="contained"
          style={{ backgroundColor: colors.primary, margin: "2%" }}
          icon="lightbulb-on"
          onPress={async () => {
            setblinking(true);
            await MetaWear.blinkLED();
            setblinking(false);
          }}
        >
          Blink
        </Button>
        <Button
          mode="contained"
          disabled={blinking}
          style={{ backgroundColor: colors.error, margin: "2%" }}
          icon="bluetooth-off"
          onPress={MetaWear.forget}
        >
          Forget
        </Button>
      </>
    );
  }

  return null;
};

type DeviceProps = { theme: ThemeType } & SubNavigatorProps<
  DeviceParamList,
  "Device",
  "device-tab"
>;

export const Device = withTheme(({ navigation, theme }: DeviceProps) => {
  const { colors } = theme;
  const authContext = useContext(AuthContext);
  const [device] = useContext(DeviceContext);

  return (
    <View style={globalStyles.container}>
      <Drawer.Section title="Device Info" style={{ width: "100%" }}>
        <Drawer.Item
          style={{ backgroundColor: colors.gray }}
          icon="bluetooth-connect"
          label="Status"
          right={() => (
            <Text>{device?.isConnected ? "Connected" : "Disconnected"}</Text>
          )}
        />
        <Drawer.Item
          style={{ backgroundColor: colors.gray }}
          icon="database"
          label="Mac Address"
          right={() => <Text>{device?.macAdress}</Text>}
        />
        <Drawer.Item
          style={{ backgroundColor: colors.gray }}
          icon="battery"
          label="Battery"
          onPress={MetaWear.updateBattery}
          right={() => <Text>{device?.batteryPercent}%</Text>}
        />
      </Drawer.Section>
      <Drawer.Section title="Device Options" style={{ width: "100%" }}>
        <Connect colors={colors} />
      </Drawer.Section>
      <Drawer.Section title="User" style={{ width: "100%" }}>
        <Button
          mode="contained"
          style={{ backgroundColor: colors.error, margin: "2%" }}
          onPress={async () => {
            await Auth.signOut();
            authContext.setauthState("signedOut");
            navigation.navigate("AuthScreen", {});
            DataStore.clear();
          }}
        >
          Sign Out
        </Button>
      </Drawer.Section>
    </View>
  );
});
