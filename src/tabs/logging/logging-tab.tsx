import React from "react";
import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { Logging } from "./logging";
import { globalStyles } from "../../styles";

export type RecordParamList = {
  Logging: {};
};

const Stack = createNativeStackNavigator<RecordParamList>();

export const LoggingRoot = () => {
  return (
    <Stack.Navigator
      initialRouteName="Logging"
      screenOptions={{ contentStyle: globalStyles.navigatorContent }}
    >
      <Stack.Screen name="Logging" component={Logging} />
    </Stack.Navigator>
  );
};
