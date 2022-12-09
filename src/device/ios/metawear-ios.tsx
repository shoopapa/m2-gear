import { NativeAppEventEmitter, NativeModules } from 'react-native';
import { LinearAccerationRecord, LinearAccerationType, QuaternionRecord, QuaternionType } from '../../types/data-format';
import { MetaWearState } from '../types';


//connecting
export const connect = () => {
  console.log('connecting')
  global.MW.connect();
};

export const connectToRemembered = () => {
  global.MW.connectToRemembered();
};

export const disconnect = async (): Promise<void> => {
  global.MW.disconnect();
};

export const forget = async (): Promise<void> => {
  global.MW.forget();
  return;
};

//info
export const updateBattery = () => {
  global.MW.updateBattery();
};
export const blinkLED = async () => {
  await global.MW.blinkLED();
};


//data controll
export const startStream = async () => {
  global.MW.startStream();
};

export const stopStream = async () => {
  global.MW.stopStream();
};

export const startPreviewStream = async () => {
  global.MW.startPreviewStream();
};

export const stopPreviewStream = async () => {
  global.MW.stopPreviewStream();
};

export const startLog = async () => {
  global.MW.startLog();
};

export const stopLog = async () => {
  global.MW.stopLog();
};

export const downloadLog = async (): Promise<{linearAcceration: LinearAccerationType, quaternion: QuaternionType}> => {
  global.eventEmitter.removeAllListeners('onQuaternionData');
  global.eventEmitter.removeAllListeners('onLinearAccerationData');

  const quaternion: QuaternionType = [[],[],[],[],[]];
  const linearAcceration: LinearAccerationType = [[],[],[],[]];
  global.eventEmitter.addListener('onQuaternionData', (body: string) => {
    const [t,w,x,y,z] = JSON.parse(body) as QuaternionRecord;
    quaternion[0].push(t);
    quaternion[1].push(w);
    quaternion[2].push(x);
    quaternion[3].push(y);
    quaternion[4].push(z);
  });
  global.eventEmitter.addListener('onLinearAccerationData', (body: string) => {
    const [t,x,y,z] = JSON.parse(body) as LinearAccerationRecord;
    linearAcceration[0].push(t);
    linearAcceration[1].push(x);
    linearAcceration[2].push(y);
    linearAcceration[3].push(z);
  });

  await global.MW.downloadLog();

  return {
    linearAcceration,
    quaternion,
  };
};

//events
export const onAccData = async (callback: (body: number[]) => void) => {
  global.eventEmitter.removeAllListeners('onAccData');
  global.eventEmitter.addListener('onAccData', (body: string) => {
    const acc = JSON.parse(body) as number[];
    callback(acc);
  });
};
export const onGyroData = async (callback: (body: number[]) => void) => {
  global.eventEmitter.removeAllListeners('onGyroData');
  global.eventEmitter.addListener('onGyroData', (body: string) => {
    const gryo = JSON.parse(body) as number[];
    callback(gryo);
  });
};
export const onLinearAccerationData = async (callback: (body: LinearAccerationRecord) => void) => {
  global.eventEmitter.removeAllListeners('onLinearAccerationData');
  global.eventEmitter.addListener('onLinearAccerationData', (body: string) => {
    const acc = JSON.parse(body) as LinearAccerationRecord;
    callback(acc);
  });
};
export const onQuaternionData = async (callback: (body: QuaternionRecord) => void) => {
  global.eventEmitter.removeAllListeners('onQuaternionData');
  global.eventEmitter.addListener('onQuaternionData', (body: string) => {
    const gryo = JSON.parse(body) as QuaternionRecord;
    callback(gryo);
  });
};
export const onPreviewData = async (callback: (body: number) => void) => {
  global.eventEmitter.removeAllListeners('onPreviewData');
  global.eventEmitter.addListener('onPreviewData', (body: string) => {
    const [mag] = JSON.parse(body) as [number];
    callback(mag);
  });
};
export const onStateUpdate = async (
  callback: (body: MetaWearState) => void
) => {
  global.eventEmitter.addListener('onStateUpdate', (body: string) => {
    const res = JSON.parse(body) as MetaWearState;
    callback(res);
  });
};
