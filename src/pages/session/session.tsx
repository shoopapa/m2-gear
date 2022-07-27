import React, {useContext} from 'react';
import {DataStore} from 'aws-amplify';
import {StatusBar, Text, View} from 'react-native';
import {
  AmplifyButton,
  // @ts-ignore
} from 'aws-amplify-react-native';

import styles from '../../styles';
import {Session} from '../../models/index';
import AuthContext from '../../auth/auth-context';

const SessionScreen = ({navigation}: any) => {
  const context = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar />
      <AmplifyButton
        onPress={async () => {
          const posts = await DataStore.query(Session);
          console.log(
            'Posts retrieved successfully!',
            JSON.stringify(posts, null, 2),
          );
        }}
        text={'get'}
      />
      <AmplifyButton
        onPress={async () => {
          // const x = Math.random();
          // console.log(x);
          // await DataStore.save(
          //   new Session({
          //     speed: x,
          //   }),
          // );
        }}
        text={'post'}
      />
    </View>
  );
};

export default SessionScreen;
