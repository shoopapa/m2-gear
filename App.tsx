import App from './src';
import {Amplify, AuthModeStrategyType} from 'aws-amplify';
import awsconfig from './src/aws-exports';

Amplify.configure({
  ...awsconfig,
  // syncExpressions: [
  //   syncExpression<Session, []>(Session, () => {
  //     return (s)=> s.createdAt('gt', (Date.now()-(24*60*60*1000)).toString());
  //   }),
  // ],
  maxRecordsToSync: 20,
  DataStore: {
    authModeStrategyType: AuthModeStrategyType.DEFAULT,
  },
});
export default App;
