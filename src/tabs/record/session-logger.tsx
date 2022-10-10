import React, { useContext, useState, useRef } from 'react';
import { View } from 'react-native';
import * as MetaWear from '../../device/ios/metawear';

import { globalStyles, ThemeType } from '../../styles';
import { ActivityIndicator, Button, withTheme } from 'react-native-paper';
import DeviceContext from '../../device/ios/device-context';

import { saveSession } from '../../utils/save-session';
import { SessionChart } from '../../components/session-chart/session-chart';
import { RecordParamList } from './record-tab';
import { SubNavigatorProps } from '../../types/sub-navigator-props';
import Config from 'react-native-config';
import { LinearAccerationType, QuaternionType } from '../../types/data-format';
import { DownloadModal } from './download-modal';

type SessionScreenProps = { theme: ThemeType } & SubNavigatorProps<
  RecordParamList,
  'Record',
  'record-tab'
>;

type LoggingControlsProps = {
  previewData: number[];
  setPreviewData: React.Dispatch<React.SetStateAction<number[]>>;
  clearData: () => void;
} & { theme: ThemeType };

const LoggingControls = withTheme(
  ({ setPreviewData, previewData, clearData, theme }: LoggingControlsProps) => {
    const { colors } = theme;
    const [device] = useContext(DeviceContext);
    const [downloading, setdownloading] = useState(false);
    const sample = useRef(0);
    const [downloadModalVis, setdownloadModalVis] = useState(false);

    const PreviewEvent = (n: number = 1) => {
      if (sample.current === 4) {
        setPreviewData((v) => {
          if (v.length > parseInt(Config.PREVIEW_DATA_LENGTH, 10)) {
            v.shift();
          }
          return [...v, n];
        });
        sample.current = 0;
        return;
      }
      sample.current += 1;
    };

    const buttons = () => {
      if (downloading) {
        return <ActivityIndicator animating={true} color={colors.primary} />;
      }

      if (previewData.length === 0) {
        return (
          <Button
            mode="contained"
            disabled={!device.isConnected}
            style={{
              backgroundColor: colors.primary,
              margin: '2%',
              width: '100%'
            }}
            onPress={() => {
              clearData();
              MetaWear.onPreviewData(PreviewEvent);
              MetaWear.startPreviewStream();
              MetaWear.startLog();
            }}
          >
            start
          </Button>
        );
      }

      return (
        <Button
          mode="contained"
          style={{ backgroundColor: colors.error, margin: '2%' }}
          onPress={() => {
            MetaWear.stopPreviewStream();
            MetaWear.stopLog();
            setdownloadModalVis(true);
          }}
        >
          {' '}
          Stop{' '}
        </Button>
      );
    };

    const onDownload = async () => {
      setdownloading(true);
      const { linearAcceration, quaternion } = await MetaWear.downloadLog();
      await saveSession(linearAcceration, quaternion);
      setdownloading(false);
      setdownloadModalVis(false);
      clearData();
    };

    return (
      <View
        style={{
          width: '100%',
          paddingHorizontal: '5%',
          height: '30%',
          display: 'flex',
          flexDirection:'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {buttons()}
        <DownloadModal
          onDelete={() => {
            clearData();
            setdownloadModalVis(false);
          }}
          setvis={setdownloadModalVis}
          vis={downloadModalVis}
          onDownload={onDownload}
        />
      </View>
    );
  },
);

export const SessionLogger = withTheme(({ theme }: SessionScreenProps) => {
  const linearAcceration = useRef<LinearAccerationType>([[], [], [], []]);
  const quaternion = useRef<QuaternionType>([[], [], [], [], []]);
  const [previewData, setPreviewData] = useState<number[]>([]);

  const clearData = () => {
    linearAcceration.current = [[], [], [], []];
    quaternion.current = [[], [], [], [], []];
    setPreviewData([]);
  };

  return (
    <View style={{ ...globalStyles.container }}>
      <SessionChart data={[previewData]} theme={theme} />
      <LoggingControls
        previewData={previewData}
        setPreviewData={setPreviewData}
        clearData={clearData}
      />
    </View>
  );
});
