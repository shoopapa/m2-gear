export interface MetaWearState {
  batteryPercent: string;
  isConnected: boolean;
  macAdress: string;
  signalStrength: string;
  isScanning: boolean;
  downloadProgress: number
  streaming: boolean;
  previewStreaming: boolean
  accelerometerFreqency?: number
  gryoFreqency?: number
  logging: boolean
}
export const DefaultMetaWearState: MetaWearState = {
  batteryPercent: '',
  isConnected: false,
  macAdress: '',
  downloadProgress: 0,
  signalStrength: '',
  previewStreaming: false,
  isScanning: false,
  streaming: false,
  logging: false,
};
