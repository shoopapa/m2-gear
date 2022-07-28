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
  var macAdress: String = ""
  var batteryPercent: String = "0"
  var streaming: Bool = false
  var isConnected: Bool = false
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
        "isConnected": state.isConnected
      ]
      return descriptions
  }
  
  @objc open override func supportedEvents() -> [String] {
    return ["onDisconect", "onAccData", "onGyroData"]
  }
  
  func retJson(state: State?) -> String {
    do {
      if state == nil {
        let jsonData = try JSONEncoder().encode(self.state)
        let jsonString = String(data: jsonData, encoding: .utf8)!
        return jsonString
      } else {
        let jsonData = try JSONEncoder().encode(state)
        let jsonString = String(data: jsonData, encoding: .utf8)!
        return jsonString
      }
    } catch {
      print(error)
      return "{}"
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
  func connect(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) -> Void {
    print("connect")
    
    let c = DispatchWorkItem {
      if self.state.isConnected == false {
        print("timeouted scan")
        MetaWearScanner.shared.stopScan()
        let s = self.ConnectionFail()
        resolve(self.retJson(state: s))
      }
    }
    DispatchQueue.main.asyncAfter(deadline: DispatchTime.now() + 6, execute: c )
    
    MetaWearScanner.shared.startScan(allowDuplicates: true) { (device) in
      print("wee found a device!")
      // Hooray! We found a MetaWear board, so stop scanning for more
      if device.rssi > -75 {
        c.cancel()
        MetaWearScanner.shared.stopScan()
        device.connectAndSetup().continueWith { t in
          if let error = t.error {
              print("falled to connect")
              print(error)
              let s = self.ConnectionFail()
              if c.isCancelled {
                resolve(self.retJson(state: s))
              }
          } else {
            t.result?.continueWith { t in
                print("lost connection event")
                self.onDisconect()
            }
            let s = self.ConnectionSuccessful(device: device)
            print(c.isCancelled)
            if c.isCancelled {
              resolve(self.retJson(state: s))
            }
            print("Connected!")
          }
        }
      }
    }
  }
  
  @objc func connectToRemembered(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) -> Void {
    let c = DispatchWorkItem {
      if self.state.isConnected == false {
        print("timeouted scan")
        MetaWearScanner.shared.stopScan()
        let s = self.ConnectionFail()
        resolve(self.retJson(state: s))
      }
    }
    
    DispatchQueue.main.asyncAfter(deadline: DispatchTime.now() + 5, execute: c )
    
    MetaWearScanner.shared.retrieveSavedMetaWearsAsync().continueOnSuccessWith { array in
      if array.first != nil {
        let savedDevice = array.first
        savedDevice!.connectAndSetup().continueWith { t in
          c.cancel()
          if t.cancelled || t.error != nil {
            print("cancelConnection() called before connection completed")
            let s = self.ConnectionFail()
            if c.isCancelled {
              resolve(self.retJson(state: s))
            }
          } else {
            t.result?.continueWith { t in
              let s = self.ConnectionFail()
              if c.isCancelled {
                resolve(self.retJson(state: s))
              }
            }
            let s = self.ConnectionSuccessful(device:savedDevice!)
            if c.isCancelled {
              resolve(self.retJson(state: s))
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
      var pattern = MblMwLedPattern()
      mbl_mw_led_load_preset_pattern(&pattern, MBL_MW_LED_PRESET_PULSE)
      mbl_mw_led_stop_and_clear(device.board)
      mbl_mw_led_write_pattern(device.board, &pattern, MBL_MW_LED_COLOR_GREEN)
      mbl_mw_led_play(device.board)
      let cancel = DispatchWorkItem {
        mbl_mw_led_stop(device.board)
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
  func startStream(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) -> Void { // add epoch to
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
        print(x)
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
    resolve(self.retJson(state: s))
  }

  @objc
  func stopStream(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) -> Void {
      let signalAcc = mbl_mw_acc_bosch_get_acceleration_data_signal(self.device?.board)!
      streamingCleanup.removeValue(forKey: signalAcc)?()
      let signalGryo = mbl_mw_gyro_bmi160_get_rotation_data_signal(self.device?.board)!
      streamingCleanup.removeValue(forKey: signalGryo)?()
      var s = self.state
      s.streaming = false
      resolve(self.retJson(state: s))
  }
  
  @objc
  func forget(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) -> Void {
    MetaWearScanner.shared.retrieveSavedMetaWearsAsync().continueOnSuccessWith { devices in
      for device in devices {
        device.forget()
      }
    }
    let s = self.ConnectionFail()
    resolve(self.retJson(state: s))
  }
  
  func onDisconect() {
    let s = self.ConnectionFail()
    self.bridge.eventDispatcher().sendAppEvent( withName: "onDisconect", body: self.retJson(state: s) )
  }
  
  func event(event: String, data: [Double] ) {
    do {
      let jsonData = try JSONEncoder().encode(data)
      let jsonString = String(data: jsonData, encoding: .utf8)!
      self.bridge.eventDispatcher().sendAppEvent(withName: event, body: jsonString )
    }
    catch { print("error") }
  }
  
  func getBattery() {
//    mbl_mw_settings_get_battery_state_data_signal(self.device?.board).read().continueOnSuccessWith(.mainThread) {
//      let battery: MblMwBatteryState = $0.valueAs()
//      self.state.batteryPercent = String(battery.charge)
//    }
  }
  
  func ConnectionSuccessful(device: MetaWear) -> State {
    print("ConnectionSuccessful")
    device.remember()
    mbl_mw_logging_clear_entries(device.board)
    self.device = device
//    self.getBattery()
    self.state.batteryPercent = String(90)
    let s = State(
      macAdress: String( device.mac! ),
      batteryPercent: self.state.batteryPercent, //not implemented
      streaming: false,
      isConnected: true
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
      isConnected: false
    )
    self.state = s
    return s
  }
}
