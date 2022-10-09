import React from 'react';
import { ScrollView, View } from 'react-native';
import { globalStyles, ThemeType } from '../../styles';

import { withTheme, List, ActivityIndicator } from 'react-native-paper';
import { timeAgo } from '../../utils/time-ago';
import { Session } from '../../models';

type SessionListProps = {
  sessions: Session[];
  theme: ThemeType;
  navigate: (s: Session) => void;
};

export const SessionList = withTheme(
  ({ sessions, theme, navigate }: SessionListProps) => {
    if (!sessions || sessions.length === 0) {
      return (
        <View style={globalStyles.container}>
          <ActivityIndicator animating={true} color={theme.colors.primary} />
        </View>
      );
    }

    return (
      <List.Section title="10 Most Recent Sessions" style={{ height: '55%' }}>
        <ScrollView style={{ height: '10%' }}>
          {sessions.map((s) => {
            if (s.createdAt) {
              const t = timeAgo.format(new Date(s.createdAt));
              return (
                <List.Item
                  onPress={() => navigate(s)}
                  key={s.id}
                  title={s.id}
                  description={t}
                  left={() => (
                    <List.Icon style={{ padding: 0, margin: 0 }} icon="run" />
                  )}
                />
              );
            }
          })}
        </ScrollView>
      </List.Section>
    );
  },
);
