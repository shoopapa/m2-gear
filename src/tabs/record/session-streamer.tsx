import React, { useContext, useState, useEffect } from "react";
import { View } from "react-native";
import * as MetaWear from "../../device/ios/metawear";

import { globalStyles, ThemeType } from "../../styles";
import { Button, Drawer, withTheme } from "react-native-paper";
import DeviceContext from "../../device/ios/device-context";
import { Tag } from "../../models";

import { saveSession } from "../../utils/save-session";
import { SaveModal } from "./save-modal";
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
  const [modalVisible, setModalVisible] = useState(false);

  const [linearAcceration, setlinearAcceration] = useState<LinearAccerationType>([[], [], [], []]);
  const [quaternion, setquaternion] = useState<QuaternionType>([[], [], [], [], []]);
  const [previewData, setPreviewData] = useState<number[]>([]);

  useEffect(()=> {
    console.log(device.downloadProgress)
    if (device.downloadProgress) {
      console.log('data finished downloaded saving now')
      saveSession(linearAcceration, quaternion).then(()=> {
        clearData()
      })
    }
  },[device.downloadProgress])


  const quaternionEvent = (q: QuaternionRecord) => {
    setquaternion((v) => ([
        [...v[0], q[0]],
        [...v[1], q[1]],
        [...v[2], q[2]],
        [...v[3], q[3]],
        [...v[4], q[4]],
      ]
    ))
  };
  const linearAccerationEvent = (a: LinearAccerationRecord) => {
    setlinearAcceration((v) => [
      [...v[0], a[0]],
      [...v[1], a[1]],
      [...v[2], a[2]],
      [...v[3], a[3]],
    ]);
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
    setPreviewData([]);
    setlinearAcceration([[], [], [], []]);
    setquaternion([[], [], [], [], []]);
  };

  const onDownload = () => {
    MetaWear.stopPreviewStream();
    MetaWear.downloadLog()
  };
  const onDownloadComplete = () => {
    clearData()

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
        {(previewData.length > 0) ? (
        <Button
          mode="contained"
          style={{ backgroundColor: colors.error, margin: "2%" }}
          onPress={() => {
            setModalVisible(true)
          }}
        > Stop and Download</Button>
        ): null}
      </Drawer.Section>
      <DownloadModal
        vis={modalVisible}
        setvis={setModalVisible}
        theme={theme}
        onDownload={onDownload}
      />
    </View>
  );
};

export const SessionStreamer = withTheme(SessionStreamerWithoutTheme);
