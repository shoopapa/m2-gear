import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type SessionMetaData = {
  readOnlyFields: 'updatedAt';
}

type TagMetaData = {
  readOnlyFields: 'updatedAt';
}

type SessionTagsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Session {
  readonly id: string;
  readonly createdAt?: string | null;
  readonly streamingStarted: number;
  readonly streamingFreqency: number;
  readonly accerationX: number[];
  readonly accerationY: number[];
  readonly accerationZ: number[];
  readonly gyroX: number[];
  readonly gyroY: number[];
  readonly gyroZ: number[];
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
  readonly sessoins?: (SessionTags | null)[] | null;
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