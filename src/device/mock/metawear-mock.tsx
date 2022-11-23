import { NativeModules, NativeAppEventEmitter } from 'react-native';
import { LinearAccerationRecord, LinearAccerationType, QuaternionRecord, QuaternionType } from '../../types/data-format';
import { MetaWearState } from '../types';

export const connect = () => {
  NativeModules.MetaWearDevice.connect();
};
export const connectToRemembered = () => {
  NativeModules.MetaWearDevice.connectToRemembered();
};
export const updateBattery = () => {
  NativeModules.MetaWearDevice.updateBattery();
};
export const updateSignalStrength = () => {
  NativeModules.MetaWearDevice.updateSignalStrength();
};

export const disconnect = async (): Promise<MetaWearState> => {
  const res = await NativeModules.MetaWearDevice.disconnect();
  const state = JSON.parse(res) as MetaWearState;
  return state;
};

export const forget = async (): Promise<void> => {
  await NativeModules.MetaWearDevice.forget();
  return;
};

export const blinkLED = async () => {
  await NativeModules.MetaWearDevice.blinkLED();
};
export const resetDevice = async () => {
  await NativeModules.MetaWearDevice.resetDevice();
};

export const onStateUpdate = async (
  callback: (body: MetaWearState) => void
) => {
  NativeAppEventEmitter.addListener('onStateUpdate', (body: string) => {
    const res = JSON.parse(body) as MetaWearState;
    callback(res);
  });
};

export const startStream = async () => {
  NativeModules.MetaWearDevice.startStream();
};

export const stopStream = async () => {
  NativeModules.MetaWearDevice.stopStream();
};

export const startPreviewStream = async () => {
  NativeModules.MetaWearDevice.startPreviewStream();
};

export const stopPreviewStream = async () => {
  NativeModules.MetaWearDevice.stopPreviewStream();
};

export const startLog = async () => {
  NativeModules.MetaWearDevice.startLog();
};

export const stopLog = async () => {
  NativeModules.MetaWearDevice.stopLog();
};


export const downloadLog = async (): Promise<{linearAcceration: LinearAccerationType, quaternion: QuaternionType}> => {
  NativeAppEventEmitter.removeAllListeners('onQuaternionData');
  NativeAppEventEmitter.removeAllListeners('onLinearAccerationData');

  const quaternion: QuaternionType = [[],[],[],[],[]];
  const linearAcceration: LinearAccerationType = [[],[],[],[]];
  NativeAppEventEmitter.addListener('onQuaternionData', (body: string) => {
    const [t,w,x,y,z] = JSON.parse(body) as QuaternionRecord;
    quaternion[0].push(t);
    quaternion[1].push(w);
    quaternion[2].push(x);
    quaternion[3].push(y);
    quaternion[4].push(z);
  });
  NativeAppEventEmitter.addListener('onLinearAccerationData', (body: string) => {
    const [t,x,y,z] = JSON.parse(body) as LinearAccerationRecord;
    linearAcceration[0].push(t);
    linearAcceration[1].push(x);
    linearAcceration[2].push(y);
    linearAcceration[3].push(z);
  });

  await NativeModules.MetaWearDevice.downloadLog();

  return {
    linearAcceration,
    quaternion,
  };
};

export const onAccData = async (callback: (body: number[]) => void) => {
  NativeAppEventEmitter.removeAllListeners('onAccData');
  NativeAppEventEmitter.addListener('onAccData', (body: string) => {
    const acc = JSON.parse(body) as number[];
    callback(acc);
  });
};

export const onGyroData = async (callback: (body: number[]) => void) => {
  NativeAppEventEmitter.removeAllListeners('onGyroData');
  NativeAppEventEmitter.addListener('onGyroData', (body: string) => {
    const gryo = JSON.parse(body) as number[];
    callback(gryo);
  });
};
export const onLinearAccerationData = async (callback: (body: LinearAccerationRecord) => void) => {
  NativeAppEventEmitter.removeAllListeners('onLinearAccerationData');
  NativeAppEventEmitter.addListener('onLinearAccerationData', (body: string) => {
    const acc = JSON.parse(body) as LinearAccerationRecord;
    callback(acc);
  });
};

export const onQuaternionData = async (callback: (body: QuaternionRecord) => void) => {
  NativeAppEventEmitter.removeAllListeners('onQuaternionData');
  NativeAppEventEmitter.addListener('onQuaternionData', (body: string) => {
    const gryo = JSON.parse(body) as QuaternionRecord;
    callback(gryo);
  });
};

export const onPreviewData = async (callback: (body: number) => void) => {
  NativeAppEventEmitter.removeAllListeners('onPreviewData');
  NativeAppEventEmitter.addListener('onPreviewData', (body: string) => {
    const [mag] = JSON.parse(body) as [number];
    callback(mag);
  });
};


export const getState = async () => {
  const body = await NativeModules.MetaWearDevice.getState();
  const state = JSON.parse(body) as MetaWearState;
  return state;
};

export const onDownloadComplete = async (callback: () => void) => {
  NativeAppEventEmitter.removeAllListeners('onDownloadComplete');
  NativeAppEventEmitter.addListener('onDownloadComplete', () => {
    callback();
  });
};
