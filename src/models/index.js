// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { SessionGroup, Move, Session } = initSchema(schema);

export {
  SessionGroup,
  Move,
  Session
};