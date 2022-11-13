import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import {
  View,
  Modal,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { Button, Title, withTheme } from 'react-native-paper';
import DeviceContext from '../../device/ios/device-context';
import { StyleContext } from '../../styles/styles';
import { ThemeType } from '../../styles/theme';

type NoDeviceConnectedModalProps = {
  devicePage: () => void;
  theme: ThemeType;
};

export const NoDeviceConnectedModal = withTheme(
  ({ theme, devicePage }: NoDeviceConnectedModalProps) => {
    const { colors } = theme;
    const [device] = useContext(DeviceContext);
    const isFocused = useIsFocused();
    const [vis, setvis] = useState(true);

    const styles = useContext(StyleContext)

    useFocusEffect(React.useCallback(() => setvis(true), []));

    return (
      <Modal
        style={{ backgroundColor: 'pink' }}
        animationType="fade"
        transparent={true}
        visible={!device.isConnected && isFocused && vis}
        collapsable
      >
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback
            onPress={() => {
              setvis(false);
            }}
          >
            <View style={overlayStyles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.modalView}>
            <Title style={{ fontSize: 18, padding: 10 }}>
              Head Gear Not Connected!
            </Title>
            {device.isScanning ? (
              <Text style={{ fontSize: 15, padding: 10 }}>Connecting</Text>
            ) : (
              <Text style={{ fontSize: 15, padding: 10 }}>
                Go to settings to connect head gear
              </Text>
            )}
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Button
                mode="contained"
                style={{
                  backgroundColor: colors.primary,
                  margin: '5%',
                  width: '80%',
                }}
                onPress={() => {
                  devicePage();
                }}
              >
                Device Settings
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  },
);

const overlayStyles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    margin: '5%',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
