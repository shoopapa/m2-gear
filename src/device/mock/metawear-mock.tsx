import { NativeAppEventEmitter, NativeModules } from 'react-native';
import { MetawearMock} from './metawear-device-mock'


export const mockMetaWear = () => {
  if (process.env.NODE_ENV === 'development') {
    const MW = new MetawearMock()
    console.log(MW)
    // NativeAppEventEmitter.removeAllListeners = MW.removeAllListeners
    //@ts-ignore
    NativeAppEventEmitter.addListener = MW.addListener
    NativeModules.MetaWearDevice = MW
  }
}
