//
//  MetaWear.m
//  m2Gear
//
//  Created by Joe Davis on 2/12/22.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(MetaWearDevice, RCTEventEmitter)

RCT_EXTERN_METHOD(supportedEvents)
+ (BOOL)requiresMainQueueSetup
{
    return NO;
}

RCT_EXTERN_METHOD( testEvent:(NSString *)eventName )

RCT_EXTERN_METHOD(
  getState: (RCTPromiseResolveBlock)resolve
  rejecter: (RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(connect)

RCT_EXTERN_METHOD(connectToRemembered)

RCT_EXTERN_METHOD(updateBattery)

//RCT_EXTERN_METHOD(updateSignalStrength)

RCT_EXTERN_METHOD(
  blinkLED: (RCTPromiseResolveBlock)resolve
  rejecter: (RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
  disconnect: (RCTPromiseResolveBlock)resolve
  rejecter: (RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(forget)

RCT_EXTERN_METHOD(startStream)

RCT_EXTERN_METHOD(stopStream)

@end
