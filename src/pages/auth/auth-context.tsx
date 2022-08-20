import React from "react";
export type AuthContextType = {
  authState: any;
  authData: any;
  setauthState: React.Dispatch<React.SetStateAction<string>>;
  setauthData: React.Dispatch<React.SetStateAction<any>>;
};
export const initAuthContext: AuthContextType = {
  authState: {},
  authData: {},
  setauthState: () => null,
  setauthData: () => null,
};
export const AuthContext =
  React.createContext<AuthContextType>(initAuthContext);
