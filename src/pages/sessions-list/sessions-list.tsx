import React, { useContext } from 'react';
import { ScrollView, View } from 'react-native';
import { ThemeType } from '../../styles/theme';

import { withTheme, List, ActivityIndicator } from 'react-native-paper';
import { timeAgo } from '../../utils/time-ago';
import { Session } from '../../models';
import { StyleContext } from '../../styles/styles';

type SessionListProps = {
  sessions: Session[];
  theme: ThemeType;
  navigate: (s: Session) => void;
};

export const SessionList = withTheme(({
    sessions, theme, navigate
  }: SessionListProps) => {
    const styles = useContext(StyleContext)

    if (!sessions || sessions.length === 0) {
      return (
        <View style={styles.container}>
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
                  title={s.name}
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
