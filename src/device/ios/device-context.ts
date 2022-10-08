import React from "react";
import { MetaWearState, DefaultMetaWearState } from "./metawear";

const DeviceContext = React.createContext<
  [MetaWearState, (v: MetaWearState) => void]
>([DefaultMetaWearState, () => null]);

export default DeviceContext;
