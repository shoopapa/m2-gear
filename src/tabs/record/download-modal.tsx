import React, { useState, useContext } from "react";
import { View , TouchableWithoutFeedback, StyleSheet,} from "react-native";

import {  ThemeType } from "../../styles";
import { Button, ProgressBar } from "react-native-paper";
import { Alert, Modal, Text } from "react-native";

import { styles } from "./styles";
import DeviceContext from '../../device/ios/device-context';


import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { Title, withTheme } from "react-native-paper";



// type DownloadModalProps = {
//   modalVisible: boolean;
//   setModalVisible: (v: boolean) => void;
//   theme: ThemeType;
//   onDownload: () => void;
//   onDiscard: () => void;
// };

// export const DownloadModal = ({
//   modalVisible,
//   setModalVisible,
//   theme,
//   onDownload,
//   onDiscard,
// }: DownloadModalProps) => {
//   const { colors } = theme;
//   const [device] = useContext(DeviceContext);

//   return (
//     <Modal
//       animationType="fade"
//       transparent={true}
//       visible={modalVisible}
//       onRequestClose={() => {
//         Alert.alert("Modal has been closed.");
//         setModalVisible(!modalVisible);
//       }}
//     >
//       <View style={styles.centeredView}>
//         <View style={styles.modalView}>
//           <View style={{ flexDirection: "column", width: "100%"}}>
//             {/* <View style={{ flexDirection: "column", width: "100%"}}> */}
//               <ProgressBar
//                 progress={.5}
//                 color={colors.primary}
//                 />
//                 <Text>
//                   Data is still being collected,
//                 </Text>
//             {/* </View> */}
//             {/* <View style={{ flexDirection: "column", width: "100%"}}> */}
//               <Button
//                 mode="contained"
//                 style={{
//                   backgroundColor: colors.primary,
//                   width: "90%",
//                 }}
//                 onPress={onDownload}
//               >
//                 Stop and Download
//               </Button>
//               <Button
//                 mode="contained"
//                 style={{
//                   backgroundColor: colors.error,
//                   width: "90%",
//                 }}
//                 onPress={onDiscard}
//               >
//                 Discard
//               </Button>
//             {/* </View> */}
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };


type DownloadModalProps = {
  theme: ThemeType;
  vis: boolean,
  setvis: (v:boolean) => void
  onDownload: () => void;
};

export const DownloadModal = withTheme(
  ({ theme,  vis, setvis, onDownload }: DownloadModalProps) => {
    const { colors } = theme;
    const [device] = useContext(DeviceContext);
    const isFocused = useIsFocused();

    useFocusEffect(React.useCallback(() => setvis(true), []));

    return (
      <Modal
        style={{ backgroundColor: "pink" }}
        animationType="fade"
        transparent={true}
        visible={ vis}
        collapsable
      >
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback
            onPress={() => {
              setvis(false);
            }}
          >
            <View style={overlayStyles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.modalView}>
            {device.downloadProgress == 0?
            <>
              <Title style={{ fontSize: 18, padding: 10 }}>
                Stop Data Collection?
              </Title>
              <Text style={{ fontSize: 15, padding: 10 }}>
                Continue recording or download the high resolution data
              </Text>
              <Text style={{ fontSize: 15, padding: 10 }}>
                Note make sure the device is close to the phone and charged
              </Text>
            </>:
              <>
               <Title style={{ fontSize: 18, padding: 10 }}>
                 Downloading Data
               </Title>
               <Text style={{ fontSize: 15, padding: 10 }}>
                 Please keep device in close
               </Text>
               <ProgressBar
                progress={.5}
               />
             </>
            }
            <View style={{ flexDirection: "column", justifyContent: "center", }}>
              <Button
                mode="contained"
                style={{
                  backgroundColor: colors.error,
                  margin: "5%",
                  width: "80%",
                }}
                onPress={onDownload}
              >
                Stop And Download
              </Button>
              <Button
                mode="contained"
                style={{
                  backgroundColor: colors.success,
                  margin: "5%",
                  width: "80%",
                }}
                onPress={()=>setvis(false)}
              >
                Continue Recording
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
);

const overlayStyles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: "center",
    margin: "5%",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

