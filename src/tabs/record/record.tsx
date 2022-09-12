import React, { useContext, useState } from "react";
import { RecordParamList } from "./record-tab";
import { View } from "react-native";
import { SessionStreamer } from "./session-streamer";
import { DataStore, Predicates, SortDirection } from "aws-amplify";
import { Session } from "../../models";
import { SessionList } from "../../pages/sessions-list/sessions-list";
import { NoDeviceConnectedModal } from "../../components/no-device-connected-modal/no-device-connected-modal";
import DeviceContext from "../../device/ios/device-context";

import type { SubNavigatorProps } from "../../types/sub-navigator-props";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

type RecordProps = SubNavigatorProps<RecordParamList, "Record", "record-tab">;

export const Record = (props: RecordProps) => {
  const { navigation } = props;

  const [sessions, setsessions] = useState<Session[]>([]);
  const [device] = useContext(DeviceContext);

  useFocusEffect(
    React.useCallback(() => {
      const subscription = DataStore.observeQuery(Session, Predicates.ALL, {
        sort: (s) => s.updatedAt(SortDirection.DESCENDING),
      }).subscribe((snapshot) => {
        const { items, isSynced } = snapshot;
        setsessions(items.slice(0, 10));
      });
      return () => subscription.unsubscribe();
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <NoDeviceConnectedModal
        devicePage={() => navigation.navigate("device-tab", {})}
      />
      <View style={{ flex: 1 }}>
        <SessionStreamer {...props} />
        <SessionList
          sessions={sessions}
          navigate={(s) => {
            navigation.navigate("Session", { id: s.id });
          }}
        />
      </View>
    </View>
  );
};
