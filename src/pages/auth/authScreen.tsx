import 'react-native-gesture-handler';
import React, { useContext } from 'react';
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
} from 'aws-amplify-react-native';

import { AuthContext } from './auth-context';
import { withTheme } from 'react-native-paper';
import { AuthParamsList } from '../../index';
import { StackScreenProps } from '@react-navigation/stack';
import { ThemeType } from '../../styles/theme';
import { Platform } from 'react-native';

const signUpConfig = {
  header: 'Register for an M2 Acount',
  hideAllDefaults: true,
  defaultCountryCode: '1',
  signUpFields: [
    {
      label: 'Username',
      key: 'preferred_username',
      required: true,
      displayOrder: 1,
      type: 'string',
    },
    {
      label: 'Email',
      key: 'email',
      required: true,
      displayOrder: 2,
      type: 'string',
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 3,
      type: 'password',
    },
  ],
};

export type AuthScreenProps = StackScreenProps<AuthParamsList, 'AuthScreen'> & {
  theme: ThemeType;
};

export const AuthScreen = withTheme(
  ({ navigation, theme }: AuthScreenProps) => {
    const authTheme = getAuthTheme(theme);

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
          if (authState === 'signedIn') {
            navigation.navigate('MainScreen', {});
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
  },
);

// Theme
const getAuthTheme = (theme: ThemeType) => {
  const deepSquidInk = '#152939';
  const textInputColor = '#000000';
  const linkUnderlayColor = '#FFF';
  const textInputBorderColor = '#C4C4C4';
  const buttonColor = theme.colors.primary;
  const disabledButtonColor = theme.colors.disabledPrimary;
  return {
    linkUnderlay: {
      color: linkUnderlayColor,
    },
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingTop: 20,
      width: '100%',
      backgroundColor: '#FFF',
    },
    section: {
      flex: 1,
      width: '100%',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
    },
    sectionScroll: {
      flex: 1,
      width: '100%',
      paddingHorizontal: 20,
    },
    sectionHeader: {
      width: '100%',
      marginBottom: 32,
      paddingTop: 20,
    },
    sectionHeaderText: {
      color: deepSquidInk,
      fontSize: 20,
      fontWeight: '500',
    },
    sectionFooter: {
      width: '100%',
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 15,
      marginBottom: 20,
    },
    sectionFooterLink: {
      fontSize: 14,
      color: buttonColor,
      alignItems: 'baseline',
      textAlign: 'center',
    },
    sectionFooterLinkDisabled: {
      fontSize: 14,
      color: disabledButtonColor,
      alignItems: 'baseline',
      textAlign: 'center',
    },
    navBar: {
      marginTop: 35,
      padding: 15,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    navButton: {
      marginLeft: 12,
      borderRadius: 4,
    },
    cell: {
      flex: 1,
      width: '50%',
    },
    errorRow: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    errorRowIcon: {
      height: 25,
      width: 25,
    },
    errorRowText: {
      marginLeft: 10,
    },
    photo: {
      width: '100%',
    },
    album: {
      width: '100%',
    },
    button: {
      backgroundColor: buttonColor,
      alignItems: 'center',
      padding: 16,
    },
    buttonDisabled: {
      backgroundColor: disabledButtonColor,
      alignItems: 'center',
      padding: 16,
    },
    buttonText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: '600',
    },
    formField: {
      marginBottom: 22,
    },
    input: {
      padding: 16,
      borderWidth: 1,
      borderRadius: 3,
      borderColor: textInputBorderColor,
      color: textInputColor,
    },
    inputLabel: {
      marginBottom: 8,
    },
    phoneContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    phoneInput: {
      flex: 2,
      padding: 16,
      borderWidth: 1,
      borderRadius: 3,
      borderColor: textInputBorderColor,
      color: textInputColor,
    },
    picker: {
      flex: 1,
      height: 44,
      // ensure that longer text values render without truncation
      // as the selected value of the Picker on Android
      minWidth: Platform.OS === 'android' ? 16 : 0,
    },
    pickerItem: {
      height: 44,
    },
    signedOutMessage: {
      textAlign: 'center',
      padding: 20,
    },
  };
};
