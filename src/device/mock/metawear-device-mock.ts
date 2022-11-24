import { defaults } from 'lodash'
import { EmitterSubscription, EventEmitter, EventSubscription, EventSubscriptionVendor } from 'react-native'
import { DefaultMetaWearState, MetaWearState } from '../types'

type FakeDevice = {
  rssi: string
  mac: string
  batteryPercent: string
}
const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

export class MetawearMock {
  state: MetaWearState
  listeners: { [key:string]: ((body: string) => void)[]}
  previewStreaming: boolean
  linearAccerationStreaming: boolean
  quaternionStreaming: boolean

  constructor () {
    this.state = DefaultMetaWearState
    this.listeners = {}
    this.previewStreaming = true
    this.linearAccerationStreaming = true
    this.quaternionStreaming = true
  }

  removeAllListeners = (listener: string) => {
    delete this.listeners[listener]
  }

  addListener = (listener: string, callback: (body: any)=> void, context?: any ): [] => {
    console.log('adding listener',listener)
    this.listeners[listener].push(callback)
    return []
  }

  connect = () => {
    //send state update event with one of these
    // timeout
    // connection fail
    // conection sucessfull
    this.state.isScanning = true
    this.listeners['onStateUpdate']?.forEach(c=>{
      c(JSON.stringify(this.state))
    })
    const state = this.ConnectionSuccessful({
      batteryPercent: '10%',
      mac: "init-connect:mac",
      rssi: '-1'
    })
    this.state = state
    setTimeout(() => {
      this.listeners['onStateUpdate']?.forEach(c=>{
        c(JSON.stringify(this.state))
      })
    }, 1000);
  }

  connectToRemembered = () => {
    //send state update event with one of these
    // timeout
    // connection fail
    // conection sucessfull
    this.state.isScanning = true
    this.listeners['onStateUpdate']?.forEach(c=>{
      c(JSON.stringify(this.state))
    })
    const state = this.ConnectionSuccessful({
      batteryPercent: '10%',
      mac: "remember-connect:mac",
      rssi: '-1'
    })
    this.state = state
    setTimeout(() => {
    this.listeners['onStateUpdate']?.forEach(c=>{
      c(JSON.stringify(this.state))
    })
    }, 1000);
  }

  forget = () => {
    const state = this.ConnectionFail()
    this.state = state
    this.listeners['onStateUpdate']?.forEach(c=>{
      c(JSON.stringify(this.state))
    })
  }

  disconnect = () => {
    const state = this.ConnectionFail()
    this.state = state
    this.listeners['onStateUpdate']?.forEach(c=>{
      c(JSON.stringify(this.state))
    })
  }

  //info
  updateBattery = () => {
    // const state = this.ConnectionFail()
    this.state.batteryPercent = 'update%'
    this.listeners['onStateUpdate']?.forEach(c=>{
      c(JSON.stringify(this.state))
    })
  }

  blinkLED = async () => {
    wait(1000)
    return 'done'
  }


  startPreviewStream = () => {
    this.previewStreaming = true;

    (async () => {
      while (this.previewStreaming) {
        await wait(10)
        this.listeners['onPreviewData']?.forEach(c=>{
          c(JSON.stringify(this.state))
        })
      }
    })()
  }

  stopPreviewStream = () => {
    this.previewStreaming = false
  }

  startLog = () => {
    this.state.logging = true
    this.listeners['onStateUpdate']?.forEach(c=>{
      c(JSON.stringify(this.state))
    })
  }

  stopLog = () => {
    this.state.logging = false
    this.listeners['onStateUpdate']?.forEach(c=>{
      c(JSON.stringify(this.state))
    })
  }

  downloadLog = async () => {
    (async () => {
      while (this.linearAccerationStreaming) {
        await wait(10)
        this.listeners['onLinearAccerationData']?.forEach(c=>{
          c(JSON.stringify(this.state))
        })
      }
    })();
    (async () => {
      while (this.quaternionStreaming) {
        await wait(10)
        this.listeners['onQuaternionData']?.forEach(c=>{
          c(JSON.stringify(this.state))
        })
      }
    })();
    await wait(3000)
    this.linearAccerationStreaming = false
    this.quaternionStreaming = false
  }


  ConnectionSuccessful = (device: FakeDevice):MetaWearState => {
    const state: MetaWearState = defaults({
      signalStrength: device.rssi,
      macAdress: device.mac,
      batteryPercent: device.batteryPercent,
      streaming: false,
      isConnected: true,
      isScanning: false
    }, DefaultMetaWearState)

    return state
  }

  ConnectionFail = (): MetaWearState => {
    const state: MetaWearState = defaults({
      macAdress: "",
      batteryPercent: "0",
      streaming: false,
      isConnected: false,
      isScanning: false
    }, DefaultMetaWearState)
    return state
  }

}
