// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Session, Tag, SessionTags } = initSchema(schema);

export {
  Session,
  Tag,
  SessionTags
};