import {NativeModules, NativeAppEventEmitter} from 'react-native';

export interface MetaWearState {
  batteryPercent: string
  isConnected: boolean
  macAdress: string
  streaming: boolean
}

export const connect = async () => {
  const p = await NativeModules.MetaWearDevice.connect();
  const state = JSON.parse(p) as MetaWearState
  return state
}
export const connectToRemembered = async (): Promise<MetaWearState> => {
  const p = await NativeModules.MetaWearDevice.connectToRemembered();
  const state = JSON.parse(p) as MetaWearState
  return state
}

export const disconnect = async (): Promise<MetaWearState> => {
  const res = await NativeModules.MetaWearDevice.disconnect();
  const state = JSON.parse(res) as MetaWearState
  return state
}

export const forget = async (): Promise<MetaWearState> => {
  const res = await NativeModules.MetaWearDevice.forget();
  const state = JSON.parse(res) as MetaWearState
  return state
}

export const blinkLED = async () => {
  await NativeModules.MetaWearDevice.blinkLED();
}

export const onDiscconect = async (callback: (body:MetaWearState) => undefined) => {
  NativeAppEventEmitter.addListener('onDisconect', (body: string) => {
    const res = JSON.parse(body)
    callback(res)
  });
}

export const startStream = async () => {
  const res = await NativeModules.MetaWearDevice.startStream();
  const state = JSON.parse(res) as MetaWearState
  return state
}

export const stopStream = async () => {
  const res = await NativeModules.MetaWearDevice.stopStream();
  const state = JSON.parse(res) as MetaWearState
  return state
}

export const onAccData = async (callback: (body:number[]) => void) => {
  NativeAppEventEmitter.addListener('onAccData', (body: string) => {
    const acc = JSON.parse(body) as number[]
    callback(acc)
  });
}

export const onGyroData = async (callback: (body:number[]) => void) => {
  NativeAppEventEmitter.addListener('onGyroData', (body: string) => {
    const gryo = JSON.parse(body) as number[]
    callback(gryo)
  });
}

export const getState = async () => {
  const body = await NativeModules.MetaWearDevice.getState();
  const state = JSON.parse(body) as MetaWearState
  return state
}
