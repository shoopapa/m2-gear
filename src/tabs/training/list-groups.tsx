import React, {useState, useEffect } from 'react';
import {View} from 'react-native';

import {globalStyles, ThemeType } from '../../styles';
import {  withTheme, List } from 'react-native-paper';

import { TrainingParamList } from './training-tab';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DataStore } from 'aws-amplify';
import { Predicates } from '@aws-amplify/datastore/lib-esm/predicates';
import { SessionGroup } from '../../models';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type CreateGroupProps = NativeStackScreenProps<TrainingParamList, 'Groups'> & {theme: ThemeType}

export const ListGroups = withTheme(({theme, navigation}:CreateGroupProps) => {
  // const {colors} = theme
  const [groups, setgroups] = useState<SessionGroup[]>([])

  useEffect(() => {
    const init = async () => {
      const groups = await DataStore.query(SessionGroup, Predicates.ALL)
      setgroups(groups)
    }
    init()
  }, [])
  
  return (
    <View style={globalStyles.container}>
      <List.Section style={{width:'100%'}}>
        {groups.map((g,i) => {
          return (
            <List.Item
              key={g.id}
              onPress={()=>{
                navigation.navigate('Training', {groupid: g.id})
              }}
              title={g.move?.type ?? 'No Move'}
              left={props => <MaterialCommunityIcons style={{padding:0, margin:0}} size={30} name="account-group" />}
            />
          )
        })}
      </List.Section>
    </View>
  )
});



