import React, { useContext, useState, useRef } from "react";
import { View } from "react-native";
import * as MetaWear from "../../device/ios/metawear";

import { globalStyles, ThemeType } from "../../styles";
import { Button, Drawer, withTheme } from "react-native-paper";
import DeviceContext from "../../device/ios/device-context";

import { saveSession } from "../../utils/save-session";
import { SessionChart } from "../../components/session-chart/session-chart";
import { RecordParamList } from "./record-tab";
import { SubNavigatorProps } from "../../types/sub-navigator-props";
import Config from "react-native-config";
import { LinearAccerationType, QuaternionType } from '../../types/data-format';

type SessionScreenProps = { theme: ThemeType } & SubNavigatorProps<
  RecordParamList,
  "Record",
  "record-tab"
>;

type LoggingControlsProps = {
  previewData: number[]
  setPreviewData:  React.Dispatch<React.SetStateAction<number[]>>
  clearData: () => void
} & { theme: ThemeType }

const LoggingControls = withTheme(({
  setPreviewData,
  previewData,
  clearData,
  theme
}: LoggingControlsProps) => {
  const { colors } = theme;
  const [device] = useContext(DeviceContext);

  const PreviewEvent = (n: number = 1) => {
    setPreviewData((v) => {
      if ( v.length > parseInt(Config.PREVIEW_DATA_LENGTH) ) {
        v.shift()
      }
      return [...v, n];
    });
  };


  if (previewData.length === 0) {
    return (
      <Drawer.Section title="Controls" style={{ width: "100%", paddingHorizontal: 20 }} >
        <Button
          mode="contained"
          style={{ backgroundColor: colors.primary, margin: "2%" }}
          onPress={() => {
            clearData()
            MetaWear.onPreviewData(PreviewEvent)
            MetaWear.startPreviewStream()
            MetaWear.startLog()
          }}
        > start </Button>
      </Drawer.Section>
    )
  }

  if (device.previewStreaming) {
    return (
    <Drawer.Section title="Controls" style={{ width: "100%", paddingHorizontal: 20 }} >
    <Button
      mode="contained"
      style={{ backgroundColor: colors.error, margin: "2%" }}
      onPress={() => {
        MetaWear.stopPreviewStream();
        MetaWear.stopLog()
      }}
    > Stop </Button>
    </Drawer.Section>
    )
  }

  return (
    <Drawer.Section title="Controls" style={{ width: "100%", paddingHorizontal: 20 }} >
    <Button
      mode="contained"
      style={{ backgroundColor: colors.warningYellow, margin: "2%" }}
      onPress={() => {
        clearData()
      }}
    > reset </Button>
    <Button
      mode="contained"
      style={{ backgroundColor: colors.success, margin: "2%" }}
      onPress={async () => {
        const {linearAcceration, quaternion} = await MetaWear.downloadLog()
        await saveSession(linearAcceration, quaternion)
        clearData()
      }}
    > download</Button>
  </Drawer.Section>
  )
})

export const SessionLogger = withTheme(({ theme }: SessionScreenProps) => {

  const linearAcceration = useRef<LinearAccerationType>([[], [], [], []])
  const quaternion = useRef<QuaternionType>([[], [], [], [], []]);
  const [previewData, setPreviewData] = useState<number[]>([]);

  const clearData = () => {
    linearAcceration.current = [[], [], [], []]
    quaternion.current = [[], [], [], [], []]
    setPreviewData([]);
  };

  return (
    <View style={{ ...globalStyles.container }}>
      <SessionChart data={[previewData]} theme={theme} />
      <LoggingControls
        previewData={previewData}
        setPreviewData={setPreviewData}
        clearData={clearData}
      />
    </View>
  );
});

