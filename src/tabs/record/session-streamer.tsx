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
import { LinearAccerationType, QuaternionRecord, LinearAccerationRecord, QuaternionType } from '../../types/data-format';
import { DownloadModal } from './download-modal';
import { onDeleteSession } from '../../graphql/subscriptions';

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

  useEffect(()=> {
    if (device.downloading == false) {
      saveSession(linearAcceration.current, quaternion.current).then(()=> {
        console.log('clearing', device)
        linearAcceration.current = [[], [], [], []]
        quaternion.current = [[], [], [], [], []]
        setPreviewData([]);
      })
    }
  },[device.downloading])


  const quaternionEvent = (q: QuaternionRecord) => {
    const v =  quaternion.current
    quaternion.current = [
      [...v[0], q[0]],
      [...v[1], q[1]],
      [...v[2], q[2]],
      [...v[3], q[3]],
      [...v[4], q[4]],
    ]
  };
  const linearAccerationEvent = (a: LinearAccerationRecord) => {
    const v = linearAcceration.current
    linearAcceration.current = [
      [...v[0], a[0]],
      [...v[1], a[1]],
      [...v[2], a[2]],
      [...v[3], a[3]],
    ]
  };
  const PreviewEvent = (n: number = 1) => {
    setPreviewData((v) => {
      if ( v.length > parseInt(Config.PREVIEW_DATA_LENGTH) ) {
        v.shift()
      }
      return [...v, n];
    });
  };

  const clearData = (n: number = 1) => {
    linearAcceration.current = [[], [], [], []]
    quaternion.current = [[], [], [], [], []]
    setPreviewData([0]);
  };

  const onDownload = () => {
    MetaWear.stopPreviewStream();
    MetaWear.downloadLog()
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
              MetaWear.onLinearAccerationData(linearAccerationEvent)
              MetaWear.onQuaternionData(quaternionEvent)
              MetaWear.startLog()
              MetaWear.startPreviewStream()
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
          onPress={() => {
            console.log('starting download', device)
            MetaWear.downloadLog()
          }}
        > download</Button>
        </>): null}
      </Drawer.Section>
    </View>
  );
};

export const SessionStreamer = withTheme(SessionStreamerWithoutTheme);
