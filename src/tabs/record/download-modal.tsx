import React, { useContext, useState } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';

import { ThemeType } from '../../styles/theme';
import { ActivityIndicator, Button } from 'react-native-paper';
import { Modal, Text } from 'react-native';

import { StyleContext } from '../../styles/styles';
import { withTheme } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-paper';
import { randomName } from '../../utils/random-name';

type DownloadModalProps = {
  vis: boolean;
  setvis: (v: boolean) => void;
  onDownload: (name: string) => Promise<void>;
  onDelete: () => void;
} & { theme: ThemeType };

export const DownloadModal = withTheme(
  ({ theme, vis, onDownload, onDelete }: DownloadModalProps) => {
    const { colors } = theme;
    const [sessionName, setSessionName] = useState(randomName());
    const [selection, setselection] = useState<
      { start: number; end?: number } | undefined
    >();
    const [downloading, setDownloading] = useState(false);
    const styles = useContext(StyleContext);

    return (
      <Modal
        style={{ backgroundColor: 'red' }}
        animationType="fade"
        transparent={true}
        visible={vis}
        collapsable
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles !== undefined ? styles.centeredView : null}
        >
          <View
            style={{
              ...styles?.modalView,
              backgroundColor: theme.colors.background,
              padding: '5%',
              height: 300,
              justifyContent: 'space-evenly',
            }}
          >
            <Ionicons
              name={'warning-outline'}
              size={50}
              color={colors.warningYellow}
            />
            <Text
              style={{
                color: colors.text,
                fontSize: 15,
                padding: 5,
                textAlign: 'center',
                paddingVertical: 5,
              }}
            >
              Do not disconnect Smart Gear until down load has completed. This
              could take several minutes.
            </Text>

            {downloading ? (
              <>
                <ActivityIndicator color={colors.primary} />
              </>
            ) : (
              <>
                <View
                  style={{
                    height: 40,
                    margin: 10,
                    marginBottom: 20,
                    width: '100%',
                  }}
                >
                  <TextInput
                    onTextInput={() => {
                      setselection(undefined);
                    }}
                    selection={selection}
                    onFocus={() => {
                      setselection({
                        start: 0,
                        end: sessionName.length,
                      });
                    }}
                    multiline={false}
                    dense
                    label={'Session Name'}
                    mode="outlined"
                    value={sessionName}
                    onChangeText={(name) => {
                      setSessionName(name);
                    }}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    height: 38,
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
                    disabled={sessionName === ''}
                    style={{
                      backgroundColor: colors.primary,
                    }}
                    onPress={async () => {
                      setDownloading(true);
                      await onDownload(sessionName);
                      setDownloading(false);
                    }}
                  >
                    Start Download
                  </Button>
                </View>
              </>
            )}
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  },
);
