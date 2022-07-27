import App from './src';
import {Amplify, AuthModeStrategyType} from 'aws-amplify';
import awsconfig from './src/aws-exports';
Amplify.configure({
  ...awsconfig,
  DataStore: {
    authModeStrategyType: AuthModeStrategyType.DEFAULT,
  },
});
export default App;
