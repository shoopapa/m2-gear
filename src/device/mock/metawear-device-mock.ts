import { defaults } from 'lodash'
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

  addListener = (listener: string, callback: (body: string)=> void) => {
    if (this.listeners[listener] === undefined) {
      this.listeners[listener] = []
    }
    this.listeners[listener].push(callback)
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


  //data
  startStream = () => {}// not mock because not in use, adding for typedefs
  stopStream = () => {} // not mock because not in use, adding for typedefs

  startPreviewStream = () => {
    this.previewStreaming = true;

    (async () => {
      while (this.previewStreaming) {
        await wait(10)
        this.listeners['onPreviewData']?.forEach(c=>{
          c(JSON.stringify([Math.random()]))
        })
      }
    })()
  }

  stopPreviewStream = () => {
    this.previewStreaming = false
  }

  startLog = () => {
    this.state.logging = true
    this.listeners.onStateUpdate.forEach(c=>{
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
          c(JSON.stringify([Math.random(),Math.random(),Math.random(),Math.random()]))
        })
      }
    })();
    (async () => {
      while (this.quaternionStreaming) {
        await wait(10)
        this.listeners['onQuaternionData']?.forEach(c=>{
          c(JSON.stringify([Math.random(),Math.random(),Math.random(),Math.random(),Math.random()]))
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
