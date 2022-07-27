import React from 'react';
export const initAuthContext: {[key: string]: any} = {
  authState: null,
  authData: null,
  setauthState: null,
  setauthData: null,
};
const AuthContext = React.createContext(initAuthContext);

export default AuthContext;
