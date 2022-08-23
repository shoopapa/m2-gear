import { Dispatch, SetStateAction } from 'react';
import { NativeModules, NativeAppEventEmitter } from "react-native";

export interface MetaWearState {
  batteryPercent: string;
  isConnected: boolean;
  macAdress: string;
  signalStrength: string;
  isScanning: boolean;
  streaming: boolean;
  accelerometerFreqency?: number
  gryoFreqency?: number
}
export const DefaultMetaWearState = {
  batteryPercent: "",
  isConnected: false,
  macAdress: "",
  signalStrength: "",
  isScanning: false,
  streaming: false,
};

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

export const forget = async (): Promise<MetaWearState> => {
  const res = await NativeModules.MetaWearDevice.forget();
  const state = JSON.parse(res) as MetaWearState;
  return state;
};

export const blinkLED = async () => {
  await NativeModules.MetaWearDevice.blinkLED();
};

export const onStateUpdate = async (
  callback: Dispatch<SetStateAction<MetaWearState>>
) => {
  NativeAppEventEmitter.addListener("onStateUpdate", (body: string) => {
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

export const onAccData = async (callback: (body: number[]) => void) => {
  NativeAppEventEmitter.removeAllListeners('onAccData')
  NativeAppEventEmitter.addListener("onAccData", (body: string) => {
    const acc = JSON.parse(body) as number[];
    callback(acc);
  });
};

export const onGyroData = async (callback: (body: number[]) => void) => {
  NativeAppEventEmitter.removeAllListeners('onGyroData')
  NativeAppEventEmitter.addListener("onGyroData", (body: string) => {
    const gryo = JSON.parse(body) as number[];
    callback(gryo);
  });
};

export const getState = async () => {
  const body = await NativeModules.MetaWearDevice.getState();
  const state = JSON.parse(body) as MetaWearState;
  return state;
};
