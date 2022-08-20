import "react-native-gesture-handler";
import React, { useContext } from "react";
import { Auth } from "aws-amplify";
// @ts-ignore
import { AmplifyButton } from "aws-amplify-react-native";
import { AuthContext } from "./pages/auth/auth-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Device } from "./tabs/device/device";
import DeviceContext from "./device/ios/device-context";
import { MetaWearState } from "./device/ios/metawear";

import { RecordRoot } from "./tabs/record/record-tab";
import { TagsScreen } from "./tabs/tags/tags-screen";
import { withTheme } from "react-native-paper";
import { globalStyles, ThemeType } from "./styles";
import { TrainingTab } from "./tabs/training/training-tab";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthParamsList } from ".";

type SignOutButtonProps = { onPress: () => void };
export const SignOutButton = ({ onPress }: SignOutButtonProps) => {
  const context = useContext(AuthContext);
  return (
    <AmplifyButton
      onPress={async () => {
        await Auth.signOut();
        context.setauthState("signedOut");
        onPress();
      }}
      text={"sign out"}
    />
  );
};

export type TabParamList = {
  "record-tab": {};
  "training-tab": {};
  "device-tab": {};
};
export const Icon = (icon: string) => {
  return (size: number, color: string) => (
    <Ionicons name={icon} size={size} color={color} />
  );
};
export const tabIcons: { [K in keyof TabParamList]: any } = {
  "record-tab": Icon("camera"),
  "training-tab": Icon("analytics-outline"),
  "device-tab": Icon("ios-list"),
};
const Tab = createBottomTabNavigator<TabParamList>();

type MainScreenProps = StackScreenProps<AuthParamsList, "MainScreen"> & {
  theme: ThemeType;
};
export const RootScreen = withTheme(
  ({ theme, navigation }: MainScreenProps) => {
    const authContext = useContext(AuthContext);

    if (authContext.authState !== "signedIn") {
      return (
        <SignOutButton onPress={() => navigation.navigate("AuthScreen", {})} />
      );
    }

    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            return tabIcons[route.name](size, color);
          },
          tabBarActiveTintColor: theme.colors.primary,
          headerShown: false,
          contentStyle: globalStyles.navigatorContent,
        })}
      >
        <Tab.Screen
          name="record-tab"
          options={{ tabBarLabel: "Record" }}
          component={RecordRoot}
        />
        <Tab.Screen
          name="training-tab"
          options={{ tabBarLabel: "AI" }}
          component={TrainingTab}
        />
        <Tab.Screen
          name="device-tab"
          options={{ headerShown: true }}
          component={Device}
        />
      </Tab.Navigator>
    );
  }
);
