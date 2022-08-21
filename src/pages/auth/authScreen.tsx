import "react-native-gesture-handler";
import React, { useContext } from "react";
import {
  Greetings,
  Authenticator,
  SignIn,
  ConfirmSignIn,
  RequireNewPassword,
  SignUp,
  ConfirmSignUp,
  VerifyContact,
  ForgotPassword,
  Loading,
  // @ts-ignore
} from "aws-amplify-react-native";

import { AuthContext } from "./auth-context";
import authTheme from "../../styles/auth-theme";
import { withTheme } from "react-native-paper";
import { AuthParamsList } from "../../index";
import { StackScreenProps } from "@react-navigation/stack";
import { ThemeType } from "../../styles";

const signUpConfig = {
  header: "Register for an M2 Acount",
  hideAllDefaults: true,
  defaultCountryCode: "1",
  signUpFields: [
    {
      label: "Username",
      key: "preferred_username",
      required: true,
      displayOrder: 1,
      type: "string",
    },
    {
      label: "Email",
      key: "email",
      required: true,
      displayOrder: 2,
      type: "string",
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 3,
      type: "password",
    },
  ],
};

export type AuthScreenProps = StackScreenProps<AuthParamsList, "AuthScreen"> & {
  theme: ThemeType;
};

export const AuthScreen = withTheme(({ navigation }: AuthScreenProps) => {
  const context = useContext(AuthContext);
  return (
    <Authenticator
      theme={authTheme}
      signUpConfig={signUpConfig}
      hideDefault={true}
      authState={context.authState}
      onStateChange={(authState: string, authData: any) => {
        context.setauthState(authState);
        context.setauthData(authData);
        if (authState === "signedIn") {
          navigation.navigate("MainScreen", {});
        }
      }}
    >
      <Greetings />
      <SignIn />
      <ConfirmSignIn />
      <RequireNewPassword />
      <SignUp signUpConfig={signUpConfig} />
      <ConfirmSignUp />
      <VerifyContact />
      <ForgotPassword />
      <Loading />
    </Authenticator>
  );
});