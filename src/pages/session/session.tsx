import React, { useContext, useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import {View, Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import * as MetaWear from '../../device/ios/metawear'

import globalStyles, { ThemeType } from '../../styles';
import {Button, Drawer,withTheme } from 'react-native-paper';
import DeviceContext from '../../device/ios/device-context';
import { Tag } from '../../models'
import { Alert, Modal, Text, StyleSheet} from "react-native";

import { SelectableTag, saveSession } from './save-session';

interface TagProps {
  tag: SelectableTag
  setTag: () => void
  isSelected: Boolean
}

const Tags = ({tag, setTag, isSelected}: TagProps)=> {
  return (
    <Button
      color='gray'
      style={{backgroundColor: isSelected ? 'rgba(0,100,0,0.12)': 'rgba(0,0,0,0)', margin:2 }}
      mode="text"
      onPress={setTag}
    >
      <View style={{ width:'100%', flexDirection: 'row', justifyContent:"space-between"}} >
        <Text>{tag.name}</Text>
        <Text>{tag.value} </Text>
      </View>
    </Button>
  )
}

interface SessionScreenProps {
  theme: ThemeType
}

const SessionScreen = ({theme}: SessionScreenProps) => {
  const {colors} = theme
  const device = useContext(DeviceContext);
  const [acc, setacc] = useState<number[][]>([[0],[0],[0]])
  const [gyro, setgyro] = useState<number[][]>([[0],[0],[0]])
  const [tags, settags] = useState<Tag[]>([])
  const [selectedTags, setselectedTags] = useState<{[key:string]: Boolean}>({})
  const [isStreaming, setisStreaming] = useState(false)
  const [streamingDataExists, setstreamingDataExists] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [viewingData, setViewingData] = useState<number[]>([])


  useEffect(() => {
    setstreamingDataExists(acc[0].length > 0)
  }, [acc])


  const gyroEvent = (g:number[]) => {
    setgyro(v => ([
      [...v[0], g[0] ],
      [...v[1], g[1] ],
      [...v[2], g[2] ],
    ]))
  }

  const accEvent = (a:number[]) => {
    setViewingData(v => {
      v.length > 100? v.shift() : null
      return [...v, a[0]]
    })
    setacc(v => ([
      [...v[0], a[0] ],
      [...v[1], a[1] ],
      [...v[2], a[2] ],
    ]))
  }

  const setTag = (Tag: Tag) => {
    setselectedTags({
      ...selectedTags,
      [Tag.id]: !selectedTags[Tag.id]
    })
  }

  return (
    <View style={globalStyles.container}>
      <LineChart
        style={globalStyles.chartContainer}
        withShadow={false}
        data={{
          labels:["time"],
          datasets: [{
            data:viewingData,
            color: (v) => {
              console.log(v)
              return colors.primary
            }
          }]
        }}
        formatYLabel={(v)=> parseFloat(v).toFixed(1)+'g'}
        formatXLabel={()=>''}
        withVerticalLines={false}
        withHorizontalLines={false}
        withDots={false}
        withInnerLines={false}
        width={Dimensions.get("window").width} // moving to middle cuz i got rid of y labels
        bezier
        height={220}
        chartConfig={{
          backgroundGradientFromOpacity: 0,
          backgroundGradientToOpacity: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          strokeWidth: 2, // optional, default 3
          barPercentage: 0.5,
          useShadowColorFromDataset: false // optional,
        }}
      />
    <Drawer.Section title="Controls" style={{width: '100%', padding:20}} >
      <View style={{flexDirection:'row', justifyContent:'space-between'}} >
        <Button
          mode="contained"
          disabled={!streamingDataExists}
          dark={false}
          style={{backgroundColor: colors.gray, margin: '2%'}}
          onPress={ () => {
            if (isStreaming) {
              MetaWear.stopStream();
              setisStreaming(false)
            } else {
              setacc([[],[],[]])
              setgyro([[],[],[]])
            }
          }}>
          {isStreaming? 'Stop': 'Reset'}
        </Button>
        <Button
          disabled={(!device.device?.isConnected || isStreaming)} // not steaming and device connected
          mode="contained"
          style={{backgroundColor: colors.primary, margin: '2%'}}
          onPress={async () => {
            MetaWear.onAccData(accEvent)
            MetaWear.onGyroData(gyroEvent)
            MetaWear.startStream()
            setisStreaming(true)
          }}
        >
          {acc[0].length > 0? 'Resume': 'Start'}
        </Button>
      </View>
      {  !(streamingDataExists && !isStreaming)? null :
        <Button
          mode="contained"
          style={{backgroundColor: colors.success, margin: '2%'}}
          disabled={acc[0].length == 0}
          onPress={async () => {
            let tags = await DataStore.query(Tag)
            setModalVisible(true)
            settags( tags )
          }}>
            Save
        </Button>
      }
    </Drawer.Section>
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Drawer.Section title="Tags" style={{width:'100%'}}>
              {tags.map(t => (
                <Tags
                  tag={t}
                  key={t.id}
                  isSelected={selectedTags[t.id]}
                  setTag={() => setTag(t)}
                />
              ))}
            </Drawer.Section>
          <View style={{width: '100%', justifyContent:"space-between"}}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <Button
                mode="contained"
                style={{backgroundColor: colors.primary, margin: '5%', width:'40%'}}
                onPress={async () => {
                  saveSession(acc, gyro, tags.filter(t => t.id in selectedTags), 0, 25)
                  setModalVisible(false)
                }}>
                Save
              </Button>
              <Button
                mode="contained"
                style={{backgroundColor: colors.error, margin: '5%', width:'40%'}}
                onPress={async () => {
                  setModalVisible(false)
                }}>
                cancel
              </Button>
            </View>
          </View>
        </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width:'80%',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    textTransform: 'uppercase',
    margin: 15,
    textAlign: "center"
  }
});


export default withTheme(SessionScreen)
