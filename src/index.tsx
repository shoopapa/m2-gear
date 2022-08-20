import "react-native-gesture-handler";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";

import { AuthContext } from "./pages/auth/auth-context";
import { RootScreen } from "./root-screen";
import { AuthScreen } from "./pages/auth/authScreen";
import { theme } from "./styles";
import DeviceContext from "./device/ios/device-context";
import { MetaWearState } from "./device/ios/metawear";

export type AuthParamsList = {
  AuthScreen: {};
  MainScreen: {};
};

const Stack = createStackNavigator<AuthParamsList>();

export const AppWithAuth = () => {
  const [authState, setauthState] = useState<string>("");
  const [authData, setauthData] = useState(null);
  const [device, setdevice] = useState<MetaWearState>({
    batteryPercent: "0",
    isConnected: false,
    macAdress: "",
    streaming: false,
  });

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AuthContext.Provider
          value={{
            authState,
            authData,
            setauthState,
            setauthData,
          }}
        >
          <DeviceContext.Provider
            value={[
              device,
              (v: MetaWearState) => {
                setdevice((d) => ({ ...d, ...v }));
              },
            ]}
          >
            <Stack.Navigator>
              <Stack.Screen
                name="AuthScreen"
                component={AuthScreen}
                options={{ title: "Sign in", headerLeft: () => null }}
              />
              <Stack.Screen
                name="MainScreen"
                component={RootScreen}
                options={{
                  headerShown: false,
                  headerLeft: () => null,
                  gestureEnabled: false,
                }}
              />
            </Stack.Navigator>
          </DeviceContext.Provider>
        </AuthContext.Provider>
      </NavigationContainer>
    </PaperProvider>
  );
};
