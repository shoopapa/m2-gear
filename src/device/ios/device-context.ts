import React from 'react';
import {MetaWearState} from './metawear'
export type setdevice = (object: MetaWearState) => void;

export interface InitDeviceContext {
  device?: MetaWearState;
  setdevice: setdevice;
}

export const initDeviceContext: InitDeviceContext = {
  device: undefined,
  setdevice: (_) => {
    return;
  },
};
const DeviceContext = React.createContext(initDeviceContext);

export default DeviceContext;
