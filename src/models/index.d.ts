import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type SessionGroupMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type MoveMetaData = {
  readOnlyFields: 'updatedAt';
}

type SessionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class SessionGroup {
  readonly id: string;
  readonly move?: Move | null;
  readonly sessions?: (Session | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly sessionGroupMoveId?: string | null;
  constructor(init: ModelInit<SessionGroup, SessionGroupMetaData>);
  static copyOf(source: SessionGroup, mutator: (draft: MutableModel<SessionGroup, SessionGroupMetaData>) => MutableModel<SessionGroup, SessionGroupMetaData> | void): SessionGroup;
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
  readonly quaternionTimestamp: number[];
  readonly quaternionW: number[];
  readonly quaternionX: number[];
  readonly quaternionY: number[];
  readonly quaternionZ: number[];
  readonly linearAccerationTimestamp: number[];
  readonly linearAccerationX: number[];
  readonly linearAccerationY: number[];
  readonly linearAccerationZ: number[];
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly sessionGroupSessionsId?: string | null;
  constructor(init: ModelInit<Session, SessionMetaData>);
  static copyOf(source: Session, mutator: (draft: MutableModel<Session, SessionMetaData>) => MutableModel<Session, SessionMetaData> | void): Session;
}