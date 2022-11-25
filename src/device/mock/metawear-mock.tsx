import { NativeAppEventEmitter, NativeModules } from 'react-native';
import { MetawearMock} from './metawear-device-mock'

declare global {
  var MW: MetawearMock;
}

export const mockMetaWear = () => {
  if (process.env.NODE_ENV === 'development') {
    global.MW = new MetawearMock()
  } else {
    global.MW = {
      ...NativeModules.MetaWearDevice,
      addListener: NativeAppEventEmitter.addListener,
      removeAllListeners: NativeAppEventEmitter.removeAllListeners
    }
  }
}
