import React, { useState } from "react";
import { RecordParamList } from "./logging-tab";
import { View } from "react-native";
import { NoDeviceConnectedModal } from "../../components/no-device-connected-modal/no-device-connected-modal";

import type { SubNavigatorProps } from "../../types/sub-navigator-props";
import { Button, withTheme } from 'react-native-paper';
import * as Metawear from '../../device/ios/metawear'

type LoggingProps = SubNavigatorProps<RecordParamList, "Logging", "logging-tab">;

export const Logging = withTheme((props: LoggingProps) => {
  const { navigation } = props;
  const [quaternion, setquaternion] = useState<number[][]>([[], [], [], []]);
  const [linearAcceration, setlinearAcceration] = useState<number[][]>([[], [], [], []]);
  const quaternionEvent = (q: number[]) => {
    setquaternion((v) => [
      [...v[0], q[0]],
      [...v[1], q[1]],
      [...v[2], q[2]],
      [...v[3], q[3]],
    ]);
  };
  const linearAccerationEvent = (a: number[]) => {
    setlinearAcceration((v) => [
      [...v[0], a[0]],
      [...v[1], a[1]],
      [...v[2], a[2]],
      [...v[3], a[3]],
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      <NoDeviceConnectedModal
        devicePage={() => navigation.navigate("device-tab", {})}
      />
      <Button
        mode="contained"
        dark={false}
        style={{ backgroundColor: props.theme.colors.gray, margin: "2%" }}
        onPress={() => {
          Metawear.startLog()
          Metawear.onQuaternionData(quaternionEvent)
          Metawear.onLinearAccerationData(linearAccerationEvent)
        }}
      >
        Start
      </Button>
      <Button
        mode="contained"
        dark={false}
        style={{ backgroundColor: props.theme.colors.gray, margin: "2%" }}
        onPress={() => {
          Metawear.stopLog()
        }}
      >
        Stop
      </Button>
    </View>
  );
});
