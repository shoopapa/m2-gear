import { NativeAppEventEmitter, NativeModules } from 'react-native';
import { MetawearMock} from './metawear-device-mock'
import Config from 'react-native-config';

declare global {
  var MW: Omit<MetawearMock, 'addListener' | 'removeAllListeners'>;
  var eventEmitter: Pick<MetawearMock, 'addListener' | 'removeAllListeners'>
}

export const mockMetaWear = () => {
  console.log('MOCK_DEVICE == ', Config.MOCK_DEVICE)
  if (Config.MOCK_DEVICE === 'true') {
    const {addListener, removeAllListeners, ...mw} = new MetawearMock()
    global.MW = mw
    global.eventEmitter = {addListener, removeAllListeners}
  } else {
    global.MW = {
      ...NativeModules.MetaWearDevice,
      listener: NativeAppEventEmitter
    }
    global.eventEmitter =  NativeAppEventEmitter
  }
}
