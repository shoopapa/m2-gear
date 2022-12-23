import React, { useContext, useState, useRef, useCallback, useEffect } from 'react';
import { Pressable, View } from 'react-native';

import { ThemeType } from '../../styles/theme';
import {  withTheme } from 'react-native-paper';
import { SessionChart } from '../../components/session-chart/session-chart';
import { RecordParamList } from './record-tab';
import { SubNavigatorProps } from '../../types/sub-navigator-props';
import { LinearAccerationType, QuaternionType } from '../../types/data-format';
import { StyleContext } from '../../styles/styles';

import { LoggingControls } from './LoggingControls';
import {  simpleSection } from '../../utils/save-session';
import DeviceContext from '../../device/device-context';
import Config from 'react-native-config';

type SessionScreenProps = { theme: ThemeType } & SubNavigatorProps<
  RecordParamList,
  'Record',
  'record-tab'
>;

export const SessionLogger = withTheme(({ theme }: SessionScreenProps) => {
  const linearAcceration = useRef<LinearAccerationType>([[], [], [], []]);
  const quaternion = useRef<QuaternionType>([[], [], [], [], []]);
  const [previewData, setPreviewData] = useState<number[]>([]);
  const [sectionData, setsectionData] = useState<number[]>([]);
  const styles = useContext(StyleContext);
  const [device] = useContext(DeviceContext);
  const sample = useRef(0);
  const pressed = useRef(false);

  const [sections, setSections] = useState<simpleSection[]>([])

  const clearData = () => {
    linearAcceration.current = [[], [], [], []];
    quaternion.current = [[], [], [], [], []];
    setPreviewData([]);
    setsectionData([]);
  };

  useEffect(() => {
    setsectionData(v=>{
      if (v.length > parseInt(Config.PREVIEW_DATA_LENGTH ?? "150", 10)) {
        v.shift();
      }
      return [...v, pressed.current? 2 : 0]
    })
  }, [previewData])


  const PreviewEvent = useCallback((n: number = 1) => {
    if (sample.current === 4) {
      setPreviewData((v) => {
        if (v.length > parseInt(Config.PREVIEW_DATA_LENGTH ?? "150", 10)) {
          v.shift();
        }
        return [...v, n]
      });
      sample.current = 0;
      return;
    }
    sample.current += 1;
  },[previewData]);

  const startSection = () => {
    if (device.isStreaming === false) return;
    pressed.current = true
    const newSection: simpleSection = {
      start: Date.now()/1000
    }
    setSections(v=>([...v, newSection]))
  }

  const endSection = () => {
    if (device.isStreaming === false) return;
    if (sections.length == 0 || sections[sections.length-1]?.start === undefined ) return;
    pressed.current =  false
    setSections(v=>{
      v[v.length-1].end = Date.now()/1000
      return v
    })
  }

  return (
    <View style={{...styles.container,   alignItems: 'flex-start'}}>
      <Pressable
        onPressIn={startSection}
        onPressOut={endSection}
        pressRetentionOffset={1000}
      >
        <SessionChart data={[previewData,sectionData]} theme={theme} epochStart={0} epochEnd={100}  />
      </Pressable>
      <LoggingControls
        sections={sections}
        previewData={previewData}
        PreviewEvent={PreviewEvent}
        clearData={clearData}
      />
    </View>
  );
});
