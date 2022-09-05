import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type MoveMetaData = {
  readOnlyFields: 'updatedAt';
}

type SessionMetaData = {
  readOnlyFields: 'updatedAt';
}

type TagMetaData = {
  readOnlyFields: 'updatedAt';
}

type SessionTagsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Move {
  readonly id: string;
  readonly createdAt?: string | null;
  readonly type: string;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Move, MoveMetaData>);
  static copyOf(source: Move, mutator: (draft: MutableModel<Move, MoveMetaData>) => MutableModel<Move, MoveMetaData> | void): Move;
}

export declare class Session {
  readonly id: string;
  readonly createdAt?: string | null;
  readonly quaternionTimestamp: number[];
  readonly quaternionW: number[];
  readonly quaternionX: number[];
  readonly quaternionY: number[];
  readonly quaternionZ: number[];
  readonly linearAccerationTimestamp: number[];
  readonly linearAccerationX: number[];
  readonly linearAccerationY: number[];
  readonly linearAccerationZ: number[];
  readonly tags?: (SessionTags | null)[] | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Session, SessionMetaData>);
  static copyOf(source: Session, mutator: (draft: MutableModel<Session, SessionMetaData>) => MutableModel<Session, SessionMetaData> | void): Session;
}

export declare class Tag {
  readonly id: string;
  readonly createdAt?: string | null;
  readonly name: string;
  readonly value: string;
  readonly sessions?: (SessionTags | null)[] | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Tag, TagMetaData>);
  static copyOf(source: Tag, mutator: (draft: MutableModel<Tag, TagMetaData>) => MutableModel<Tag, TagMetaData> | void): Tag;
}

export declare class SessionTags {
  readonly id: string;
  readonly session: Session;
  readonly tag: Tag;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<SessionTags, SessionTagsMetaData>);
  static copyOf(source: SessionTags, mutator: (draft: MutableModel<SessionTags, SessionTagsMetaData>) => MutableModel<SessionTags, SessionTagsMetaData> | void): SessionTags;
}