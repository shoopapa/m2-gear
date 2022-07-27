import 'react-native-gesture-handler';
import React, {useContext, useState} from 'react';
import Amplify from 'aws-amplify';
// @ts-ignore
import {AmplifyButton} from 'aws-amplify-react-native';
import AuthContext from './auth/auth-context';
import {BottomNavigation} from 'react-native-paper';

import Device from './pages/device/device';
import SessionScreen from './pages/session/session';
import DeviceContext from './pages/device/device-context';

function SignOutButton({navigation}: any) {
  const context = useContext(AuthContext);
  return (
    <AmplifyButton
      onPress={async () => {
        await Amplify.Auth.signOut();
        context.setauthState('signedOut');
        navigation.navigate('AuthScreen');
      }}
      text={'sign out'}
    />
  );
}

function MainScreen() {
  const authContext = useContext(AuthContext);
  const [device, setdevice] = useState(null);
  const [state, setState] = useState({
    index: 0,
    routes: [
      {key: 'SessionScreen', title: 'Session', icon: 'movie-open'},
      {key: 'Device', title: 'Device', icon: 'cellphone-cog'},
    ],
  });

  if (authContext.authState !== 'signedIn') {
    return <SignOutButton />;
  }
  //@ts-ignore
  const renderScene = BottomNavigation.SceneMap({SessionScreen, Device});

  return (
    <DeviceContext.Provider
      value={{
        device,
        setdevice,
      }}>
      <BottomNavigation
        navigationState={state}
        onIndexChange={(v: number) => {
          setState({...state, index: v});
        }}
        renderScene={renderScene}
      />
    </DeviceContext.Provider>
  );
}

export default MainScreen;
