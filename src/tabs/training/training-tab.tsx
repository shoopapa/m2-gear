import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SessionPage } from "../../pages/session/session";
import { Training } from "./training";
import { ListGroups } from "./list-groups";

export type TrainingParamList = {
  Groups: {};
  Training: { groupid?: string };
  Session: { id: string };
};

const Stack = createNativeStackNavigator<TrainingParamList>();

export const TrainingTab = () => {
  return (
    <Stack.Navigator
      initialRouteName="Groups"
      screenOptions={{ contentStyle: { backgroundColor: "#FFFFFF" } }}
    >
      <Stack.Screen name="Groups"   component={ListGroups}  />
      <Stack.Screen name="Training" component={Training}    />
      <Stack.Screen name="Session"  component={SessionPage} />
    </Stack.Navigator>
  );
};
