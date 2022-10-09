import React from 'react';
import { View, StyleSheet } from 'react-native';

import { ThemeType } from '../../styles';
import { Button } from 'react-native-paper';
import { Modal, Text } from 'react-native';

import { styles } from './styles';
import { withTheme } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

type DownloadModalProps = {
  vis: boolean;
  setvis: (v: boolean) => void;
  onDownload: () => void;
  onDelete: () => void;
} & { theme: ThemeType };

export const DownloadModal = withTheme(
  ({ theme, vis, onDownload, onDelete }: DownloadModalProps) => {
    const { colors } = theme;

    return (
      <Modal
        style={{ backgroundColor: 'pink' }}
        animationType="fade"
        transparent={true}
        visible={vis}
        collapsable
      >
        <View style={styles.centeredView}>
          <View style={{ ...styles.modalView, padding: '5%' }}>
            <Ionicons
              name={'warning-outline'}
              size={50}
              color={colors.warningYellow}
            />
            <Text style={{ fontSize: 15, padding: 10 }}>
              Be sure you have time to keep Smart Gear in close proximity for an
              extended amout of time
            </Text>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              <Button
                mode="contained"
                style={{
                  backgroundColor: colors.error,
                }}
                onPress={onDelete}
              >
                Delete
              </Button>
              <Button
                mode="contained"
                style={{
                  backgroundColor: colors.primary,
                }}
                onPress={onDownload}
              >
                Start Download
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  },
);
