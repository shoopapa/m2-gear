import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

type SessionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
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
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Session = LazyLoading extends LazyLoadingDisabled ? EagerSession : LazySession

export declare const Session: (new (init: ModelInit<Session, SessionMetaData>) => Session) & {
  copyOf(source: Session, mutator: (draft: MutableModel<Session, SessionMetaData>) => MutableModel<Session, SessionMetaData> | void): Session;
}
