// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Move, Session, Tag, SessionTags } = initSchema(schema);

export {
  Move,
  Session,
  Tag,
  SessionTags
};