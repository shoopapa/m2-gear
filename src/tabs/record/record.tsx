import React, { useState } from 'react';
import { RecordParamList } from './record-tab';
import { View } from 'react-native';
import { SessionLogger } from './session-logger';
import { DataStore, Predicates, SortDirection } from 'aws-amplify';
import { Session } from '../../models';
import { SessionList } from '../../pages/sessions-list/sessions-list';
import { NoDeviceConnectedModal } from '../../components/no-device-connected-modal/no-device-connected-modal';

import type { SubNavigatorProps } from '../../types/sub-navigator-props';
import { useFocusEffect } from '@react-navigation/native';
import { withTheme } from 'react-native-paper';

type RecordProps = SubNavigatorProps<RecordParamList, 'Record', 'record-tab'>;

export const Record = withTheme((props: RecordProps) => {
  const { navigation, theme } = props;

  const [sessions, setsessions] = useState<Session[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const subscription = DataStore.observeQuery(Session, Predicates.ALL, {
        sort: (s) => s.updatedAt(SortDirection.DESCENDING),
      }).subscribe((snapshot) => {
        const { items } = snapshot;
        setsessions(items.slice(0, 10));
      });
      return () => subscription.unsubscribe();
    }, []),
  );

  return (
    <View
      style={{ flex: 1, backgroundColor: theme.colors.defaultBackgroundColor }}
    >
      <NoDeviceConnectedModal
        devicePage={() => navigation.navigate('device-tab', {})}
      />
      <View style={{ flex: 1 }}>
        <SessionLogger {...props} />
        <SessionList
          sessions={sessions}
          navigate={(s) => {
            navigation.navigate('Session', { id: s.id });
          }}
        />
      </View>
    </View>
  );
});
