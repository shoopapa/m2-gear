import React from 'react';
type setdevice = (object: any) => void;

export interface InitDeviceContext {
  device: any;
  setdevice: setdevice;
}

export const initDeviceContext: InitDeviceContext = {
  device: null,
  setdevice: (_) => {
    return;
  },
};
const DeviceContext = React.createContext(initDeviceContext);

export default DeviceContext;
