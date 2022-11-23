import React from 'react';
import { MetaWearState, DefaultMetaWearState } from './ios/metawear-ios';

const DeviceContext = React.createContext<
  [MetaWearState,(v: MetaWearState) => void]
>([DefaultMetaWearState, () => null]);

export default DeviceContext;
