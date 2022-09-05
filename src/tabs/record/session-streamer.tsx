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

  const onSave = (tags: Tag[], selectedTags: { [key: string]: Boolean }) => {
    saveSession(
      linearAcceration,
      quaternion,
      tags.filter((t) => t.id in selectedTags),
    );
    setModalVisible(false);
  };

  return (
    <View style={{ ...globalStyles.container }}>
      <SessionChart data={[previewData]} theme={theme} />
      <Drawer.Section
        title="Controls"
        style={{ width: "100%", paddingHorizontal: 20 }}
      >
        {(!device.previewStreaming && previewData.length === 0) ? (
          <Button
            mode="contained"
            style={{ backgroundColor: colors.primary, margin: "2%" }}
            onPress={() => {
              MetaWear.onPreviewData(PreviewEvent)
              MetaWear.onLinearAccerationData(linearAccerationEvent)
              MetaWear.onQuaternionData(quaternionEvent)
              // MetaWear.startLog()
              MetaWear.startPreviewStream()
            }}
          > start </Button>
        ) : null}
        {(!device.previewStreaming && previewData.length > 0) ? (
          <Button
            mode="contained"
            dark={false}
            style={{ backgroundColor: colors.warningYellow, margin: "2%" }}
            onPress={() => {
              setPreviewData([]);
              setlinearAcceration([[], [], [], []]);
              setquaternion([[], [], [], [], []]);
            }}
          > reset </Button>
        ): null}
        {device.previewStreaming ? (
          <Button
            mode="contained"
            style={{ backgroundColor: colors.error, margin: "2%" }}
            onPress={() => {
              MetaWear.stopPreviewStream();
              // MetaWear.stopLog()
            }}
          > Stop </Button>
        ): null}
        <Button
          mode="contained"
          style={{ backgroundColor: colors.success, margin: "2%" }}
          disabled={!(previewData.length > 0 && !device.previewStreaming)}
          onPress={async () => setModalVisible(true)}
        > Save </Button>
      </Drawer.Section>
      <SaveModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        theme={theme}
        onSave={onSave}
      />
    </View>
  );
};

export const SessionStreamer = withTheme(SessionStreamerWithoutTheme);
