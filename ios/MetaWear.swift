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

enum MyError: Error {
    case runtimeError(String)
}

struct State : Codable {
  var signalStrength: String = ""
  var macAdress: String = ""
  var batteryPercent: String = "0"
  var streaming: Bool = false
  var downloadProgress: Double = 1
  var downloading: Bool = false
  var previewStreaming: Bool = false
  var logging: Bool = false
  var isConnected: Bool = false
  var isScanning: Bool = false
  var accelerometerFreqency: Int = 50
  var gryoFreqency: Int = 50
}

@objc(MetaWearDevice)
class MetaWearDevice: RCTEventEmitter {
  private var state = State()
  var device: MetaWear?
  var streamingCleanup: [OpaquePointer: () -> Void] = [:]
  var handlers = MblMwLogDownloadHandler()
  var qfuser: OpaquePointer!
  var afuser: OpaquePointer!
  var resolve: RCTPromiseResolveBlock!


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
    return ["onAccData", "onGyroData", "onStateUpdate", "onLinearAccerationData","onQuaternionData","onPreviewData", "onDownloadComplete"]
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
    DispatchQueue.main.asyncAfter(deadline: DispatchTime.now() + 7, execute: c )

    MetaWearScanner.shared.startScan(allowDuplicates: true) { (device) in
      print("wee found a device!")
      // Hooray! We found a MetaWear board, so stop scanning for more
      if device.rssi > -50 {
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

  @objc
  func resetDevice() {
    self.device?.clearAndReset()
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

    DispatchQueue.main.asyncAfter(deadline: DispatchTime.now() + 7, execute: c )

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
    self.state.accelerometerFreqency = 50
    self.state.gryoFreqency = 50
    mbl_mw_gyro_bmi160_set_range(device?.board, MBL_MW_GYRO_BOSCH_RANGE_2000dps)
    var freq = MBL_MW_GYRO_BOSCH_ODR_50Hz
    do {
        freq = try decodeGryoFrequency(freq: self.state.gryoFreqency)
    } catch {
      print("Did not choose an avilable gryo sampling rate options are (25,50,100,200,400,800,1600,3200), using 50")
      self.state.gryoFreqency = 50
    }
    mbl_mw_gyro_bmi160_set_odr(device?.board, freq)
    mbl_mw_acc_bosch_set_range(device?.board, MBL_MW_ACC_BOSCH_RANGE_16G)
    mbl_mw_acc_set_odr(device?.board, Float(self.state.accelerometerFreqency))
    mbl_mw_acc_bosch_write_acceleration_config(device?.board)
    mbl_mw_gyro_bmi160_write_config(device?.board)
    retJson(state: self.state)

    let b = bObj(obj: self)
    let signalAcc = mbl_mw_acc_bosch_get_acceleration_data_signal(device?.board)!
    mbl_mw_datasignal_subscribe(signalAcc, b) {(context, obj) in
        let acceleration: MblMwCartesianFloat = obj!.pointee.valueAs()
        let _self: MetaWearDevice = bPtr(ptr: context!)
        let x = Double(acceleration.x)
        let y = Double(acceleration.y)
        let z = Double(acceleration.z)
        _self.event(event: "onAccData", data: [x,y,z] )
    }
    let signalGyro = mbl_mw_gyro_bmi160_get_rotation_data_signal(device?.board)!
    mbl_mw_datasignal_subscribe(signalGyro, b) {(context, obj) in
        let gryo: MblMwCartesianFloat = obj!.pointee.valueAs()
        let _self: MetaWearDevice = bPtr(ptr: context!)
        let x = Double(gryo.x)
        let y = Double(gryo.y)
        let z = Double(gryo.z)
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
  func startPreviewStream() -> Void { // add epoch to
    print("starting Preview stream")
    var s = self.state
    s.previewStreaming = true
    retJson(state: s)


     let asignal = mbl_mw_sensor_fusion_get_data_signal(device?.board, MBL_MW_SENSOR_FUSION_DATA_LINEAR_ACC)!
     mbl_mw_datasignal_subscribe(asignal, bObj(obj: self)) {(context, obj) in
         let acceleration: MblMwCartesianFloat = obj!.pointee.valueAs()
         let _self: MetaWearDevice = bPtr(ptr: context!)
         let v = (pow(Double(acceleration.x),2) + pow(Double(acceleration.y),2) + pow(Double(acceleration.z),2)).squareRoot()
         _self.event(event: "onPreviewData", data: [v] )
     }

     streamingCleanup[asignal] = {
         mbl_mw_acc_stop(self.device?.board)
         mbl_mw_acc_disable_acceleration_sampling(self.device?.board)
         mbl_mw_datasignal_unsubscribe(asignal)
     }
  }

  @objc
  func stopPreviewStream() -> Void {
    // let asignal = mbl_mw_sensor_fusion_get_data_signal(device?.board, MBL_MW_SENSOR_FUSION_DATA_LINEAR_ACC)!
    // streamingCleanup.removeValue(forKey: asignal)?()

    var s = self.state
    s.previewStreaming = false
    retJson(state: s)
  }

  @objc
  func startLog() {
    print("startLOG")
    let b = bObj(obj: self)
    var s = self.state
    s.logging = true
    retJson(state: s)

    let accelRange = MBL_MW_SENSOR_FUSION_ACC_RANGE_16G
    let gyroRange = MBL_MW_SENSOR_FUSION_GYRO_RANGE_2000DPS
    let sensorFusionMode = MBL_MW_SENSOR_FUSION_MODE_IMU_PLUS
    mbl_mw_logging_clear_entries(device?.board)
    mbl_mw_logging_stop(device?.board)
    mbl_mw_event_remove_all(device?.board)
    mbl_mw_metawearboard_tear_down(device?.board)

    mbl_mw_sensor_fusion_set_acc_range(device?.board, accelRange)
    mbl_mw_sensor_fusion_set_gyro_range(device?.board, gyroRange)
    mbl_mw_sensor_fusion_set_mode(device?.board, sensorFusionMode)
    let qsignal = mbl_mw_sensor_fusion_get_data_signal(device?.board, MBL_MW_SENSOR_FUSION_DATA_QUATERNION)!
    mbl_mw_logger_generate_identifier(qsignal)
    mbl_mw_datasignal_log(qsignal, b) { (context, logger) in
      print("mbl_mw_datasignal_log q")
      let _self:MetaWearDevice = bPtr(ptr: context!)
      _self.qfuser = logger!
      mbl_mw_logger_generate_identifier(logger!)
      print("Started logger: ", _self.qfuser as Any)

    }
    let asignal = mbl_mw_sensor_fusion_get_data_signal(device?.board, MBL_MW_SENSOR_FUSION_DATA_LINEAR_ACC)!
    mbl_mw_datasignal_log(asignal, b) { (context, logger) in
      let _self:MetaWearDevice = bPtr(ptr: context!)
      print("mbl_mw_datasignal_log a")
      _self.afuser = logger!
      print("Started logger: ", _self.afuser as Any)
    }
    mbl_mw_logging_start(device?.board, 0)
    mbl_mw_sensor_fusion_clear_enabled_mask(device?.board)
    mbl_mw_sensor_fusion_enable_data(device?.board, MBL_MW_SENSOR_FUSION_DATA_QUATERNION)
    mbl_mw_sensor_fusion_enable_data(device?.board, MBL_MW_SENSOR_FUSION_DATA_LINEAR_ACC)
    mbl_mw_sensor_fusion_write_config(device?.board)
    mbl_mw_sensor_fusion_start(device?.board)

  }

  @objc
  func stopLog() {
    print("StopLog")
    mbl_mw_sensor_fusion_stop(self.device?.board)
    mbl_mw_sensor_fusion_clear_enabled_mask(self.device?.board)
    mbl_mw_logging_clear_entries(device?.board)
  }

  @objc
  func downloadLog(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) -> Void {
    self.resolve = resolve
    print("downloadLog")
    let b = bObj(obj: self)
    var s = self.state
    s.downloadProgress = 0
    s.downloading = true
    self.retJson(state: s)
    // resolve("done")

    mbl_mw_sensor_fusion_stop(self.device?.board)
    mbl_mw_sensor_fusion_clear_enabled_mask(self.device?.board)
    mbl_mw_logger_subscribe(self.afuser, b, { (context, dataPtr) in
      let _self:MetaWearDevice = bPtr(ptr: context!)
      let timestamp = Double(dataPtr!.pointee.timestamp.timeIntervalSince1970)
      let a: MblMwCartesianFloat = dataPtr!.pointee.valueAs()
      let x = Double(a.x)
      let y = Double(a.y)
      let z = Double(a.z)
      _self.event(event: "onLinearAccerationData", data: [timestamp, x,y,z] )
//      print("a : \(timestamp) \(a)")
    })
    mbl_mw_logger_subscribe( self.qfuser, b, { (context, dataPtr) in
      let _self:MetaWearDevice = bPtr(ptr: context!)
      let timestamp = Double(dataPtr!.pointee.timestamp.timeIntervalSince1970)
      let q: MblMwQuaternion = dataPtr!.pointee.valueAs()
      let w = Double(q.w)
      let x = Double(q.x)
      let y = Double(q.y)
      let z = Double(q.z)
      _self.event(event: "onQuaternionData", data: [timestamp,w,x,y,z] )
//      print("q : \(timestamp) \(q)")
    })
    self.handlers = MblMwLogDownloadHandler()
    self.handlers.context = b
    self.handlers.received_progress_update = { (context, remainingEntries, totalEntries) in
      let _self: MetaWearDevice = bPtr(ptr: context!)
      if (remainingEntries == 0) {
        _self.resolve("done")
      }
    }
    self.handlers.received_unknown_entry = { (context, id, epoch, data, length) in
        print("received_unknown_entry")
    }
    self.handlers.received_unhandled_entry = { (context, data) in
        print("received_unhandled_entry")
    }
    mbl_mw_logging_download(self.device?.board, 0, &self.handlers)
  }

  @objc
  func forget() -> Void {
    MetaWearScanner.shared.retrieveSavedMetaWearsAsync().continueOnSuccessWith { devices in
      for device in devices {
        device.clearAndReset()
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
    var s = self.state
    s.signalStrength = String(self.device?.averageRSSI(lastNSeconds: 5) ?? 0)
    s.macAdress = String( device.mac! )
    s.batteryPercent = self.state.batteryPercent
    s.streaming = false
    s.isConnected = true
    s.isScanning = false
    self.state = s

    return s
  }

  func ConnectionFail() -> State {
    print("ConnectionFail")
    var s = self.state
    s.macAdress = ""
    s.batteryPercent = "0"
    s.streaming = false
    s.isConnected = false
    s.isScanning = false
    self.state = s
    return s
  }

  func decodeGryoFrequency(freq:Int) throws -> MblMwGyroBoschOdr  {
      switch self.state.gryoFreqency {
      case 25:
        return MBL_MW_GYRO_BOSCH_ODR_25Hz
      case 50:
        return MBL_MW_GYRO_BOSCH_ODR_50Hz
      case 100:
        return MBL_MW_GYRO_BOSCH_ODR_100Hz
      case 200:
        return MBL_MW_GYRO_BOSCH_ODR_200Hz
      case 400:
        return MBL_MW_GYRO_BOSCH_ODR_400Hz
      case 800:
        return MBL_MW_GYRO_BOSCH_ODR_800Hz
      case 1600:
        return MBL_MW_GYRO_BOSCH_ODR_1600Hz
      case 3200:
        return MBL_MW_GYRO_BOSCH_ODR_3200Hz
      default:
        throw MyError.runtimeError("Did not choose an avilable gryo sampling rate options are (25,50,100,200,400,800,1600,3200)")
    }

  }
}
