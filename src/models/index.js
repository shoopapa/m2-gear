// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Session, SessionSection } = initSchema(schema);

export {
  Session,
  SessionSection
};