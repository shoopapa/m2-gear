import React from "react";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Record } from "./record";
import { SessionPage } from "../../pages/session/session";
import { globalStyles } from "../../styles";

export type RecordParamList = {
  Record: {};
  Session: { id: string };
};

const Stack = createNativeStackNavigator<RecordParamList>();

export const RecordRoot = () => {
  return (
    <Stack.Navigator
      initialRouteName="Record"
      screenOptions={{ contentStyle: globalStyles.navigatorContent }}
    >
      <Stack.Screen name="Record" component={Record} />
      <Stack.Screen name="Session" component={SessionPage} />
    </Stack.Navigator>
  );
};
