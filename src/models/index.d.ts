import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";

type SessionGroupMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type MoveMetaData = {
  readOnlyFields: 'updatedAt';
}

type SessionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerSessionGroup = {
  readonly id: string;
  readonly move?: Move | null;
  readonly sessions?: (Session | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly sessionGroupMoveId?: string | null;
}

type LazySessionGroup = {
  readonly id: string;
  readonly move: AsyncItem<Move | undefined>;
  readonly sessions: AsyncCollection<Session>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly sessionGroupMoveId?: string | null;
}

export declare type SessionGroup = LazyLoading extends LazyLoadingDisabled ? EagerSessionGroup : LazySessionGroup

export declare const SessionGroup: (new (init: ModelInit<SessionGroup, SessionGroupMetaData>) => SessionGroup) & {
  copyOf(source: SessionGroup, mutator: (draft: MutableModel<SessionGroup, SessionGroupMetaData>) => MutableModel<SessionGroup, SessionGroupMetaData> | void): SessionGroup;
}

type EagerMove = {
  readonly id: string;
  readonly createdAt?: string | null;
  readonly type: string;
  readonly updatedAt?: string | null;
}

type LazyMove = {
  readonly id: string;
  readonly createdAt?: string | null;
  readonly type: string;
  readonly updatedAt?: string | null;
}

export declare type Move = LazyLoading extends LazyLoadingDisabled ? EagerMove : LazyMove

export declare const Move: (new (init: ModelInit<Move, MoveMetaData>) => Move) & {
  copyOf(source: Move, mutator: (draft: MutableModel<Move, MoveMetaData>) => MutableModel<Move, MoveMetaData> | void): Move;
}

type EagerSession = {
  readonly id: string;
  readonly name?: string | null;
  readonly quaternionTimestamp: number[];
  readonly quaternionW: number[];
  readonly quaternionX: number[];
  readonly quaternionY: number[];
  readonly quaternionZ: number[];
  readonly linearAccerationTimestamp: number[];
  readonly linearAccerationX: number[];
  readonly linearAccerationY: number[];
  readonly linearAccerationZ: number[];
  readonly sessiongroupID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySession = {
  readonly id: string;
  readonly name?: string | null;
  readonly quaternionTimestamp: number[];
  readonly quaternionW: number[];
  readonly quaternionX: number[];
  readonly quaternionY: number[];
  readonly quaternionZ: number[];
  readonly linearAccerationTimestamp: number[];
  readonly linearAccerationX: number[];
  readonly linearAccerationY: number[];
  readonly linearAccerationZ: number[];
  readonly sessiongroupID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Session = LazyLoading extends LazyLoadingDisabled ? EagerSession : LazySession

export declare const Session: (new (init: ModelInit<Session, SessionMetaData>) => Session) & {
  copyOf(source: Session, mutator: (draft: MutableModel<Session, SessionMetaData>) => MutableModel<Session, SessionMetaData> | void): Session;
}