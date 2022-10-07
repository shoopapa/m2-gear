import React, { useContext, useState, useEffect, useRef } from "react";
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

const SessionStreamerWithoutTheme = ({ theme }: SessionScreenProps) => {
  const { colors } = theme;
  const [device] = useContext(DeviceContext);
  const linearAcceration = useRef<LinearAccerationType>([[], [], [], []])
  const quaternion = useRef<QuaternionType>([[], [], [], [], []]);
  const [previewData, setPreviewData] = useState<number[]>([]);

  const PreviewEvent = (n: number = 1) => {
    setPreviewData((v) => {
      if ( v.length > parseInt(Config.PREVIEW_DATA_LENGTH) ) {
        v.shift()
      }
      return [...v, n];
    });
  };

  const clearData = (n: number = 1) => {
    console.log('clear')
    linearAcceration.current = [[], [], [], []]
    quaternion.current = [[], [], [], [], []]
    setPreviewData([]);
  };

  return (
    <View style={{ ...globalStyles.container }}>
      <SessionChart data={[previewData]} theme={theme} />
      <Drawer.Section
        title="Controls"
        style={{ width: "100%", paddingHorizontal: 20 }}
      >
        {(previewData.length === 0) ? (
          <Button
            mode="contained"
            style={{ backgroundColor: colors.primary, margin: "2%" }}
            onPress={() => {
              console.log('starting log')
              clearData()
              MetaWear.onPreviewData(PreviewEvent)
              MetaWear.startPreviewStream()
              MetaWear.startLog()
            }}
          > start </Button>
        ) : null}
        {(previewData.length !== 0 && device.previewStreaming) ? (
        <Button
          mode="contained"
          style={{ backgroundColor: colors.error, margin: "2%" }}
          onPress={() => {
            MetaWear.stopPreviewStream();
            MetaWear.stopLog()
          }}
        > Stop </Button>
        ): null}
        {(previewData.length !== 0 && !device.previewStreaming) ? (<>
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
        </>): null}
      </Drawer.Section>
    </View>
  );
};

export const SessionStreamer = withTheme(SessionStreamerWithoutTheme);
