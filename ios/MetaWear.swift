//
//  MetaWear.swift
//  m2Gear
//
//  Created by Joe Davis on 2/12/22.
//

import Foundation
import MetaWear
import MetaWearCpp
import React

import MessageUI
import BoltsSwift

func bObj(obj: MetaWearDevice) -> UnsafeMutableRawPointer {
  return bridge(obj: obj)
}

func bPtr(ptr: UnsafeRawPointer) -> MetaWearDevice {
  return bridge(ptr: ptr)
}


struct State : Codable {
  var signalStrength: String = ""
  var macAdress: String = ""
  var batteryPercent: String = "0"
  var streaming: Bool = false
  var isConnected: Bool = false
  var isScanning: Bool = false
}

@objc(MetaWearDevice)
class MetaWearDevice: RCTEventEmitter {
  private var state = State()
  var device: MetaWear?
  var streamingCleanup: [OpaquePointer: () -> Void] = [:]


  @objc
  override func constantsToExport() -> [AnyHashable : Any]! {
      let descriptions: [AnyHashable: Any] = [
        "macAdress": state.macAdress,
        "batteryPercent": state.batteryPercent,
        "streaming": state.streaming,
        "isScanning": state.isScanning,
        "isConnected": state.isConnected,
        "signalStrength": state.signalStrength
      ]
      return descriptions
  }

  @objc open override func supportedEvents() -> [String] {
    return ["onAccData", "onGyroData", "onStateUpdate"]
  }

  func retJson(state: State) {
    do {
      self.state = state
      let jsonData = try JSONEncoder().encode(state)
      let jsonString = String(data: jsonData, encoding: .utf8)!
      self.bridge.eventDispatcher().sendAppEvent(withName: "onStateUpdate", body: jsonString )
    } catch {
      print(error)
    }
  }

  @objc
  func getState(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) -> Void {
    print("getState")
    do {
      let jsonData = try JSONEncoder().encode(state)
      let jsonString = String(data: jsonData, encoding: .utf8)!
      resolve(jsonString)
    } catch { print(error) }
  }

  @objc
  func connect() -> Void {
    var s = self.state
    s.isScanning = true
    retJson(state: s)
    print("connect")

    let c = DispatchWorkItem {
      print("timeouted scan")
      MetaWearScanner.shared.stopScan()
      let s = self.ConnectionFail()
      self.retJson(state: s)
    }
    DispatchQueue.main.asyncAfter(deadline: DispatchTime.now() + 6, execute: c )

    MetaWearScanner.shared.startScan(allowDuplicates: true) { (device) in
      print("wee found a device!")
      // Hooray! We found a MetaWear board, so stop scanning for more
      if device.rssi > -100 {
        self.state.signalStrength = String(self.device?.rssi ?? 0)
        c.cancel()
        MetaWearScanner.shared.stopScan()
        device.connectAndSetup().continueWith { t in
          if let error = t.error {
              print("falled to connect")
              print(error)
              let s = self.ConnectionFail()
              if c.isCancelled {
                self.retJson(state: s)
              }
          } else {
            if c.isCancelled {
              t.result?.continueWith { t in
                  print("lost connection event")
                  let s = self.ConnectionFail()
                  self.retJson(state: s) //removed resolve cuz this is the disconnect event
              }
              let s = self.ConnectionSuccessful(device: device)
              self.retJson(state: s)
            }
            print("Connected!")
          }
        }
      }
    }
  }

  @objc func connectToRemembered() -> Void {
    var s = self.state
    s.isScanning = true
    retJson(state: s)

    let c = DispatchWorkItem {
      if self.state.isConnected == false {
        print("timeouted scan")
        MetaWearScanner.shared.stopScan()
        let s = self.ConnectionFail()
        self.retJson(state: s)
      }
    }

    DispatchQueue.main.asyncAfter(deadline: DispatchTime.now() + 5, execute: c )

    MetaWearScanner.shared.retrieveSavedMetaWearsAsync().continueOnSuccessWith { array in
      if array.first != nil {
        let savedDevice = array.first
        self.state.signalStrength = String(savedDevice?.rssi ?? 0)
        savedDevice!.connectAndSetup().continueWith { t in
          c.cancel()
          if t.cancelled || t.error != nil {
            print("cancelConnection() called before connection completed")
            let s = self.ConnectionFail()
            if c.isCancelled {
              self.retJson(state: s)
            }
          } else {
            t.result?.continueWith { t in
              let s = self.ConnectionFail()
              if c.isCancelled {
                self.retJson(state: s)
              }
            }
            let s = self.ConnectionSuccessful(device:savedDevice!)
            if c.isCancelled {
              self.retJson(state: s)
            }
          }
        }
      }
    }
  }

  @objc
  func blinkLED(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) -> Void {
    print("blinkLED")

    if let device = self.device {
      device.flashLED(color: .blue, intensity: 1.0, _repeat: 4)
      mbl_mw_haptic_start_motor(device.board, 100, 500)
      let cancel = DispatchWorkItem {
        resolve("done")
      }
      DispatchQueue.main.asyncAfter(deadline: DispatchTime.now() + 3, execute: cancel )
    }
  }

  @objc
  func disconnect(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) -> Void {
    print("dissconnect")
    let s = self.ConnectionFail()
    resolve(self.retJson(state: s))
  }


  @objc
  func startStream() -> Void { // add epoch to
    print("starting stream")
    let b = bObj(obj: self)

    mbl_mw_acc_bosch_set_range(device?.board, MBL_MW_ACC_BOSCH_RANGE_16G)
    mbl_mw_acc_set_odr(device?.board, 25)
    mbl_mw_acc_bosch_write_acceleration_config(device?.board)
    let signalAcc = mbl_mw_acc_bosch_get_acceleration_data_signal(device?.board)!
    mbl_mw_datasignal_subscribe(signalAcc, b) {(context, obj) in
        let acceleration: MblMwCartesianFloat = obj!.pointee.valueAs()
        let _self: MetaWearDevice = bPtr(ptr: context!)
        let x = Double(acceleration.x)
        let y = Double(acceleration.y)
        let z = Double(acceleration.z)
        _self.event(event: "onAccData", data: [x,y,z] )
    }

    mbl_mw_gyro_bmi160_set_range(device?.board, MBL_MW_GYRO_BOSCH_RANGE_125dps)
    mbl_mw_gyro_bmi160_set_odr(device?.board, MBL_MW_GYRO_BOSCH_ODR_25Hz)
    mbl_mw_gyro_bmi160_write_config(device?.board)
    let signalGyro = mbl_mw_gyro_bmi160_get_rotation_data_signal(device?.board)!
    mbl_mw_datasignal_subscribe(signalGyro, b) {(context, obj) in
        let acceleration: MblMwCartesianFloat = obj!.pointee.valueAs()
        let _self: MetaWearDevice = bPtr(ptr: context!)
        let x = Double(acceleration.x)
        let y = Double(acceleration.y)
        let z = Double(acceleration.z)
        _self.event(event: "onGyroData", data: [x,y,z] )
    }

    mbl_mw_acc_enable_acceleration_sampling(device?.board)
    mbl_mw_acc_start(device?.board)

    mbl_mw_gyro_bmi160_enable_rotation_sampling(device?.board)
    mbl_mw_gyro_bmi160_start(device?.board)


    streamingCleanup[signalAcc] = {
        mbl_mw_acc_stop(self.device?.board)
        mbl_mw_acc_disable_acceleration_sampling(self.device?.board)
        mbl_mw_datasignal_unsubscribe(signalAcc)
    }
    streamingCleanup[signalGyro] = {
        mbl_mw_gyro_bmi160_stop(self.device?.board)
        mbl_mw_gyro_bmi160_disable_rotation_sampling(self.device?.board)
        mbl_mw_datasignal_unsubscribe(signalGyro)
    }

    var s = self.state
    s.streaming = true
    self.retJson(state: s)
  }

  @objc
  func stopStream() -> Void {
      let signalAcc = mbl_mw_acc_bosch_get_acceleration_data_signal(self.device?.board)!
      streamingCleanup.removeValue(forKey: signalAcc)?()
      let signalGryo = mbl_mw_gyro_bmi160_get_rotation_data_signal(self.device?.board)!
      streamingCleanup.removeValue(forKey: signalGryo)?()

      var s = self.state
      s.streaming = false
      self.retJson(state: s)
  }

  @objc
  func forget() -> Void {
    MetaWearScanner.shared.retrieveSavedMetaWearsAsync().continueOnSuccessWith { devices in
      for device in devices {
        device.forget()
      }
    }
    let s = self.ConnectionFail()
    self.retJson(state: s)
  }

  @objc
  func updateBattery() {
    var s = self.state
    s.batteryPercent = ""
    self.retJson(state: s)
    if let board = device?.board {
      let batt = mbl_mw_settings_get_battery_state_data_signal(board);
      batt?.read().continueOnSuccessWith {
        var s = self.state
        s.batteryPercent = String(($0.valueAs() as MblMwBatteryState).charge)
        self.retJson(state: s)
      }
    }
  }

//  @objc
//  func updateSignalStrength() {
//    var s = self.state
//    s.signalStrength =  String(self.device?.rssi ?? 0)
//    print(s.signalStrength)
//    self.retJson(state: s)
//  }

  func onDisconect() {
    let s = self.ConnectionFail()
    self.retJson(state: s)
  }

  func event(event: String, data: [Double] ) {
    do {
      let jsonData = try JSONEncoder().encode(data)
      let jsonString = String(data: jsonData, encoding: .utf8)!
      self.bridge.eventDispatcher().sendAppEvent(withName: event, body: jsonString )
    }
    catch { print("error") }
  }

  func ConnectionSuccessful(device: MetaWear) -> State {
    print("ConnectionSuccessful")
    device.remember()
    mbl_mw_logging_clear_entries(device.board)
    self.device = device
    self.updateBattery()
    let s = State(
      signalStrength: String(self.device?.averageRSSI(lastNSeconds: 5) ?? 0),
      macAdress: String( device.mac! ),
      batteryPercent: self.state.batteryPercent, //not implemented
      streaming: false,
      isConnected: true,
      isScanning: false
    )
    self.state = s

    return s
  }

  func ConnectionFail() -> State {
    print("ConnectionFail")
    let s = State(
      macAdress: "",
      batteryPercent: "0",
      streaming: false,
      isConnected: false,
      isScanning: false
    )
    self.state = s
    return s
  }
}
