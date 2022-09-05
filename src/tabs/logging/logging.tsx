import React, { useState } from "react";
import { RecordParamList } from "./logging-tab";
import { View } from "react-native";
import { NoDeviceConnectedModal } from "../../components/no-device-connected-modal/no-device-connected-modal";

import type { SubNavigatorProps } from "../../types/sub-navigator-props";
import { Button, withTheme } from 'react-native-paper';
import * as Metawear from '../../device/ios/metawear'
import { SessionList } from "../../pages/sessions-list/sessions-list";
import { useFocusEffect } from '@react-navigation/native';
import { DataStore, Predicates, SortDirection } from 'aws-amplify';
import { Session } from '../../models';
import { LinearAccerationRecord,  LinearAccerationType, QuaternionRecord, QuaternionType } from '../../types/data-format';
import { saveSession } from '../../utils/save-session';

type LoggingProps = SubNavigatorProps<RecordParamList, "Logging", "logging-tab">;

export const Logging = withTheme((props: LoggingProps) => {
  const { navigation } = props;
  const [quaternion, setquaternion] = useState<QuaternionType>([[], [], [], [], []]);
  const [linearAcceration, setlinearAcceration] = useState<LinearAccerationType>([[], [], [], []]);
  const [sessions, setsessions] = useState<Session[]>([]);

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

  const onSave = () => {
    saveSession(
      linearAcceration,
      quaternion,
      []
    );
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
      <SessionList
          sessions={sessions}
          navigate={(s) => {
          }}
        />
    </View>
  );
});
function setsessions(arg0: Session[]) {
  throw new Error('Function not implemented.');
}

