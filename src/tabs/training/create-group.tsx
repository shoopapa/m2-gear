// import React, { useContext, useState, useEffect } from 'react';
// import {Pressable, View} from 'react-native';
// import * as MetaWear from '../../device/ios/metawear'

// import {globalStyles, ThemeType } from '../../styles';
// import { Button, Menu, Text, withTheme,TextInput } from 'react-native-paper';

// import { TrainingParamList } from './training-tab';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { Move } from '../../models';
// import { DataStore } from 'aws-amplify';
// import { Predicates } from '@aws-amplify/datastore/lib-esm/predicates';
// import { SessionGroup } from '../../models';

// type CreateGroupProps = NativeStackScreenProps<TrainingParamList, 'CreateGroup'> & {theme: ThemeType}

// export const CreateGroup = withTheme(({theme, navigation}:CreateGroupProps) => {
//   const {colors} = theme
//   const [visible, setVisible] = React.useState(false);
//   const openMenu = () => setVisible(true);
//   const closeMenu = () => setVisible(false);
//   const [moves, setMoves] = useState<Move[]>([])
//   const [move, setmove] = useState<Move|null>(null)
//   const [name, setName] = useState('')

//   useEffect(() => {
//     const init = async () => {
//       const moves = await DataStore.query(Move, Predicates.ALL)
//       setMoves(moves)
//     }
//     init()
//   }, [])

//   const save = async () => {
//     const sg = new SessionGroup({
//       move: move
//     })
//     DataStore.save(sg)
//     navigation.navigate('Training',{groupid: sg.id})
//   }

//   return (
//     <View style={globalStyles.container}>
//        <View style={globalStyles.TextInputWrapper}>
//         <TextInput
//           label="Name"
//           value={name}
//           onChangeText={setName}
//         />
//        </View>
//        <View style={{...globalStyles.container, marginTop: 10}}>
//         <Menu
//           visible={visible}
//           onDismiss={closeMenu}
//           anchor={<Button mode='contained' onPress={openMenu}>{move? `Move: ${move.type}`: 'Select Move'}</Button>}
//         >
//           {moves.map(m=>{
//             return <Menu.Item onPress={ () => {setmove(m); setVisible(false)}} title={m.type}/>
//           })}
//         </Menu>
//         <Button mode='contained' style={{margin: 10}} onPress={save}>save</Button>
//        </View>
//     </View>
//   );
// });
