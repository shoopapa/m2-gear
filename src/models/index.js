// @ts-check
import { initSchema } from "@aws-amplify/datastore";
import { schema } from "./schema";

const { SessionGroup, Move, Session, Tag, SessionTags } = initSchema(schema);

export { SessionGroup, Move, Session, Tag, SessionTags };
