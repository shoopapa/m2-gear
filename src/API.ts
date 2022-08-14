/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateSessionGroupInput = {
  id?: string | null,
  _version?: number | null,
  sessionGroupMoveId?: string | null,
};

export type ModelSessionGroupConditionInput = {
  and?: Array< ModelSessionGroupConditionInput | null > | null,
  or?: Array< ModelSessionGroupConditionInput | null > | null,
  not?: ModelSessionGroupConditionInput | null,
  sessionGroupMoveId?: ModelIDInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type SessionGroup = {
  __typename: "SessionGroup",
  id: string,
  move?: Move | null,
  sessions?: ModelSessionConnection | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  sessionGroupMoveId?: string | null,
  owner?: string | null,
};

export type Move = {
  __typename: "Move",
  id: string,
  createdAt?: string | null,
  type: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type ModelSessionConnection = {
  __typename: "ModelSessionConnection",
  items:  Array<Session | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type Session = {
  __typename: "Session",
  id: string,
  isTraining?: boolean | null,
  createdAt?: string | null,
  streamingStarted: number,
  streamingFreqency: number,
  accerationX: Array< number >,
  accerationY: Array< number >,
  accerationZ: Array< number >,
  gyroX: Array< number >,
  gyroY: Array< number >,
  gyroZ: Array< number >,
  tags?: ModelSessionTagsConnection | null,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  sessionGroupSessionsId?: string | null,
  owner?: string | null,
};

export type ModelSessionTagsConnection = {
  __typename: "ModelSessionTagsConnection",
  items:  Array<SessionTags | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type SessionTags = {
  __typename: "SessionTags",
  id: string,
  sessionID: string,
  tagID: string,
  session: Session,
  tag: Tag,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  owner?: string | null,
};

export type Tag = {
  __typename: "Tag",
  id: string,
  createdAt?: string | null,
  name: string,
  value: string,
  sessions?: ModelSessionTagsConnection | null,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateSessionGroupInput = {
  id: string,
  _version?: number | null,
  sessionGroupMoveId?: string | null,
};

export type DeleteSessionGroupInput = {
  id: string,
  _version?: number | null,
};

export type CreateMoveInput = {
  id?: string | null,
  createdAt?: string | null,
  type: string,
  _version?: number | null,
};

export type ModelMoveConditionInput = {
  createdAt?: ModelStringInput | null,
  type?: ModelStringInput | null,
  and?: Array< ModelMoveConditionInput | null > | null,
  or?: Array< ModelMoveConditionInput | null > | null,
  not?: ModelMoveConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateMoveInput = {
  id: string,
  createdAt?: string | null,
  type?: string | null,
  _version?: number | null,
};

export type DeleteMoveInput = {
  id: string,
  _version?: number | null,
};

export type CreateSessionInput = {
  id?: string | null,
  isTraining?: boolean | null,
  createdAt?: string | null,
  streamingStarted: number,
  streamingFreqency: number,
  accerationX: Array< number >,
  accerationY: Array< number >,
  accerationZ: Array< number >,
  gyroX: Array< number >,
  gyroY: Array< number >,
  gyroZ: Array< number >,
  _version?: number | null,
  sessionGroupSessionsId?: string | null,
};

export type ModelSessionConditionInput = {
  isTraining?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  streamingStarted?: ModelFloatInput | null,
  streamingFreqency?: ModelFloatInput | null,
  accerationX?: ModelFloatInput | null,
  accerationY?: ModelFloatInput | null,
  accerationZ?: ModelFloatInput | null,
  gyroX?: ModelFloatInput | null,
  gyroY?: ModelFloatInput | null,
  gyroZ?: ModelFloatInput | null,
  and?: Array< ModelSessionConditionInput | null > | null,
  or?: Array< ModelSessionConditionInput | null > | null,
  not?: ModelSessionConditionInput | null,
  sessionGroupSessionsId?: ModelIDInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateSessionInput = {
  id: string,
  isTraining?: boolean | null,
  createdAt?: string | null,
  streamingStarted?: number | null,
  streamingFreqency?: number | null,
  accerationX?: Array< number > | null,
  accerationY?: Array< number > | null,
  accerationZ?: Array< number > | null,
  gyroX?: Array< number > | null,
  gyroY?: Array< number > | null,
  gyroZ?: Array< number > | null,
  _version?: number | null,
  sessionGroupSessionsId?: string | null,
};

export type DeleteSessionInput = {
  id: string,
  _version?: number | null,
};

export type CreateTagInput = {
  id?: string | null,
  createdAt?: string | null,
  name: string,
  value: string,
  _version?: number | null,
};

export type ModelTagConditionInput = {
  createdAt?: ModelStringInput | null,
  name?: ModelStringInput | null,
  value?: ModelStringInput | null,
  and?: Array< ModelTagConditionInput | null > | null,
  or?: Array< ModelTagConditionInput | null > | null,
  not?: ModelTagConditionInput | null,
};

export type UpdateTagInput = {
  id: string,
  createdAt?: string | null,
  name?: string | null,
  value?: string | null,
  _version?: number | null,
};

export type DeleteTagInput = {
  id: string,
  _version?: number | null,
};

export type CreateSessionTagsInput = {
  id?: string | null,
  sessionID: string,
  tagID: string,
  _version?: number | null,
};

export type ModelSessionTagsConditionInput = {
  sessionID?: ModelIDInput | null,
  tagID?: ModelIDInput | null,
  and?: Array< ModelSessionTagsConditionInput | null > | null,
  or?: Array< ModelSessionTagsConditionInput | null > | null,
  not?: ModelSessionTagsConditionInput | null,
};

export type UpdateSessionTagsInput = {
  id: string,
  sessionID?: string | null,
  tagID?: string | null,
  _version?: number | null,
};

export type DeleteSessionTagsInput = {
  id: string,
  _version?: number | null,
};

export type ModelSessionGroupFilterInput = {
  id?: ModelIDInput | null,
  and?: Array< ModelSessionGroupFilterInput | null > | null,
  or?: Array< ModelSessionGroupFilterInput | null > | null,
  not?: ModelSessionGroupFilterInput | null,
  sessionGroupMoveId?: ModelIDInput | null,
};

export type ModelSessionGroupConnection = {
  __typename: "ModelSessionGroupConnection",
  items:  Array<SessionGroup | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelMoveFilterInput = {
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  type?: ModelStringInput | null,
  and?: Array< ModelMoveFilterInput | null > | null,
  or?: Array< ModelMoveFilterInput | null > | null,
  not?: ModelMoveFilterInput | null,
};

export type ModelMoveConnection = {
  __typename: "ModelMoveConnection",
  items:  Array<Move | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelSessionFilterInput = {
  id?: ModelIDInput | null,
  isTraining?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  streamingStarted?: ModelFloatInput | null,
  streamingFreqency?: ModelFloatInput | null,
  accerationX?: ModelFloatInput | null,
  accerationY?: ModelFloatInput | null,
  accerationZ?: ModelFloatInput | null,
  gyroX?: ModelFloatInput | null,
  gyroY?: ModelFloatInput | null,
  gyroZ?: ModelFloatInput | null,
  and?: Array< ModelSessionFilterInput | null > | null,
  or?: Array< ModelSessionFilterInput | null > | null,
  not?: ModelSessionFilterInput | null,
  sessionGroupSessionsId?: ModelIDInput | null,
};

export type ModelTagFilterInput = {
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  name?: ModelStringInput | null,
  value?: ModelStringInput | null,
  and?: Array< ModelTagFilterInput | null > | null,
  or?: Array< ModelTagFilterInput | null > | null,
  not?: ModelTagFilterInput | null,
};

export type ModelTagConnection = {
  __typename: "ModelTagConnection",
  items:  Array<Tag | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelSessionTagsFilterInput = {
  id?: ModelIDInput | null,
  sessionID?: ModelIDInput | null,
  tagID?: ModelIDInput | null,
  and?: Array< ModelSessionTagsFilterInput | null > | null,
  or?: Array< ModelSessionTagsFilterInput | null > | null,
  not?: ModelSessionTagsFilterInput | null,
};

export type CreateSessionGroupMutationVariables = {
  input: CreateSessionGroupInput,
  condition?: ModelSessionGroupConditionInput | null,
};

export type CreateSessionGroupMutation = {
  createSessionGroup?:  {
    __typename: "SessionGroup",
    id: string,
    move?:  {
      __typename: "Move",
      id: string,
      createdAt?: string | null,
      type: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    sessions?:  {
      __typename: "ModelSessionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    sessionGroupMoveId?: string | null,
    owner?: string | null,
  } | null,
};

export type UpdateSessionGroupMutationVariables = {
  input: UpdateSessionGroupInput,
  condition?: ModelSessionGroupConditionInput | null,
};

export type UpdateSessionGroupMutation = {
  updateSessionGroup?:  {
    __typename: "SessionGroup",
    id: string,
    move?:  {
      __typename: "Move",
      id: string,
      createdAt?: string | null,
      type: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    sessions?:  {
      __typename: "ModelSessionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    sessionGroupMoveId?: string | null,
    owner?: string | null,
  } | null,
};

export type DeleteSessionGroupMutationVariables = {
  input: DeleteSessionGroupInput,
  condition?: ModelSessionGroupConditionInput | null,
};

export type DeleteSessionGroupMutation = {
  deleteSessionGroup?:  {
    __typename: "SessionGroup",
    id: string,
    move?:  {
      __typename: "Move",
      id: string,
      createdAt?: string | null,
      type: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    sessions?:  {
      __typename: "ModelSessionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    sessionGroupMoveId?: string | null,
    owner?: string | null,
  } | null,
};

export type CreateMoveMutationVariables = {
  input: CreateMoveInput,
  condition?: ModelMoveConditionInput | null,
};

export type CreateMoveMutation = {
  createMove?:  {
    __typename: "Move",
    id: string,
    createdAt?: string | null,
    type: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateMoveMutationVariables = {
  input: UpdateMoveInput,
  condition?: ModelMoveConditionInput | null,
};

export type UpdateMoveMutation = {
  updateMove?:  {
    __typename: "Move",
    id: string,
    createdAt?: string | null,
    type: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteMoveMutationVariables = {
  input: DeleteMoveInput,
  condition?: ModelMoveConditionInput | null,
};

export type DeleteMoveMutation = {
  deleteMove?:  {
    __typename: "Move",
    id: string,
    createdAt?: string | null,
    type: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateSessionMutationVariables = {
  input: CreateSessionInput,
  condition?: ModelSessionConditionInput | null,
};

export type CreateSessionMutation = {
  createSession?:  {
    __typename: "Session",
    id: string,
    isTraining?: boolean | null,
    createdAt?: string | null,
    streamingStarted: number,
    streamingFreqency: number,
    accerationX: Array< number >,
    accerationY: Array< number >,
    accerationZ: Array< number >,
    gyroX: Array< number >,
    gyroY: Array< number >,
    gyroZ: Array< number >,
    tags?:  {
      __typename: "ModelSessionTagsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    sessionGroupSessionsId?: string | null,
    owner?: string | null,
  } | null,
};

export type UpdateSessionMutationVariables = {
  input: UpdateSessionInput,
  condition?: ModelSessionConditionInput | null,
};

export type UpdateSessionMutation = {
  updateSession?:  {
    __typename: "Session",
    id: string,
    isTraining?: boolean | null,
    createdAt?: string | null,
    streamingStarted: number,
    streamingFreqency: number,
    accerationX: Array< number >,
    accerationY: Array< number >,
    accerationZ: Array< number >,
    gyroX: Array< number >,
    gyroY: Array< number >,
    gyroZ: Array< number >,
    tags?:  {
      __typename: "ModelSessionTagsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    sessionGroupSessionsId?: string | null,
    owner?: string | null,
  } | null,
};

export type DeleteSessionMutationVariables = {
  input: DeleteSessionInput,
  condition?: ModelSessionConditionInput | null,
};

export type DeleteSessionMutation = {
  deleteSession?:  {
    __typename: "Session",
    id: string,
    isTraining?: boolean | null,
    createdAt?: string | null,
    streamingStarted: number,
    streamingFreqency: number,
    accerationX: Array< number >,
    accerationY: Array< number >,
    accerationZ: Array< number >,
    gyroX: Array< number >,
    gyroY: Array< number >,
    gyroZ: Array< number >,
    tags?:  {
      __typename: "ModelSessionTagsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    sessionGroupSessionsId?: string | null,
    owner?: string | null,
  } | null,
};

export type CreateTagMutationVariables = {
  input: CreateTagInput,
  condition?: ModelTagConditionInput | null,
};

export type CreateTagMutation = {
  createTag?:  {
    __typename: "Tag",
    id: string,
    createdAt?: string | null,
    name: string,
    value: string,
    sessions?:  {
      __typename: "ModelSessionTagsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateTagMutationVariables = {
  input: UpdateTagInput,
  condition?: ModelTagConditionInput | null,
};

export type UpdateTagMutation = {
  updateTag?:  {
    __typename: "Tag",
    id: string,
    createdAt?: string | null,
    name: string,
    value: string,
    sessions?:  {
      __typename: "ModelSessionTagsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteTagMutationVariables = {
  input: DeleteTagInput,
  condition?: ModelTagConditionInput | null,
};

export type DeleteTagMutation = {
  deleteTag?:  {
    __typename: "Tag",
    id: string,
    createdAt?: string | null,
    name: string,
    value: string,
    sessions?:  {
      __typename: "ModelSessionTagsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateSessionTagsMutationVariables = {
  input: CreateSessionTagsInput,
  condition?: ModelSessionTagsConditionInput | null,
};

export type CreateSessionTagsMutation = {
  createSessionTags?:  {
    __typename: "SessionTags",
    id: string,
    sessionID: string,
    tagID: string,
    session:  {
      __typename: "Session",
      id: string,
      isTraining?: boolean | null,
      createdAt?: string | null,
      streamingStarted: number,
      streamingFreqency: number,
      accerationX: Array< number >,
      accerationY: Array< number >,
      accerationZ: Array< number >,
      gyroX: Array< number >,
      gyroY: Array< number >,
      gyroZ: Array< number >,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      sessionGroupSessionsId?: string | null,
      owner?: string | null,
    },
    tag:  {
      __typename: "Tag",
      id: string,
      createdAt?: string | null,
      name: string,
      value: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type UpdateSessionTagsMutationVariables = {
  input: UpdateSessionTagsInput,
  condition?: ModelSessionTagsConditionInput | null,
};

export type UpdateSessionTagsMutation = {
  updateSessionTags?:  {
    __typename: "SessionTags",
    id: string,
    sessionID: string,
    tagID: string,
    session:  {
      __typename: "Session",
      id: string,
      isTraining?: boolean | null,
      createdAt?: string | null,
      streamingStarted: number,
      streamingFreqency: number,
      accerationX: Array< number >,
      accerationY: Array< number >,
      accerationZ: Array< number >,
      gyroX: Array< number >,
      gyroY: Array< number >,
      gyroZ: Array< number >,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      sessionGroupSessionsId?: string | null,
      owner?: string | null,
    },
    tag:  {
      __typename: "Tag",
      id: string,
      createdAt?: string | null,
      name: string,
      value: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type DeleteSessionTagsMutationVariables = {
  input: DeleteSessionTagsInput,
  condition?: ModelSessionTagsConditionInput | null,
};

export type DeleteSessionTagsMutation = {
  deleteSessionTags?:  {
    __typename: "SessionTags",
    id: string,
    sessionID: string,
    tagID: string,
    session:  {
      __typename: "Session",
      id: string,
      isTraining?: boolean | null,
      createdAt?: string | null,
      streamingStarted: number,
      streamingFreqency: number,
      accerationX: Array< number >,
      accerationY: Array< number >,
      accerationZ: Array< number >,
      gyroX: Array< number >,
      gyroY: Array< number >,
      gyroZ: Array< number >,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      sessionGroupSessionsId?: string | null,
      owner?: string | null,
    },
    tag:  {
      __typename: "Tag",
      id: string,
      createdAt?: string | null,
      name: string,
      value: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type GetSessionGroupQueryVariables = {
  id: string,
};

export type GetSessionGroupQuery = {
  getSessionGroup?:  {
    __typename: "SessionGroup",
    id: string,
    move?:  {
      __typename: "Move",
      id: string,
      createdAt?: string | null,
      type: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    sessions?:  {
      __typename: "ModelSessionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    sessionGroupMoveId?: string | null,
    owner?: string | null,
  } | null,
};

export type ListSessionGroupsQueryVariables = {
  filter?: ModelSessionGroupFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSessionGroupsQuery = {
  listSessionGroups?:  {
    __typename: "ModelSessionGroupConnection",
    items:  Array< {
      __typename: "SessionGroup",
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      sessionGroupMoveId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncSessionGroupsQueryVariables = {
  filter?: ModelSessionGroupFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncSessionGroupsQuery = {
  syncSessionGroups?:  {
    __typename: "ModelSessionGroupConnection",
    items:  Array< {
      __typename: "SessionGroup",
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      sessionGroupMoveId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetMoveQueryVariables = {
  id: string,
};

export type GetMoveQuery = {
  getMove?:  {
    __typename: "Move",
    id: string,
    createdAt?: string | null,
    type: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListMovesQueryVariables = {
  filter?: ModelMoveFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMovesQuery = {
  listMoves?:  {
    __typename: "ModelMoveConnection",
    items:  Array< {
      __typename: "Move",
      id: string,
      createdAt?: string | null,
      type: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncMovesQueryVariables = {
  filter?: ModelMoveFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncMovesQuery = {
  syncMoves?:  {
    __typename: "ModelMoveConnection",
    items:  Array< {
      __typename: "Move",
      id: string,
      createdAt?: string | null,
      type: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetSessionQueryVariables = {
  id: string,
};

export type GetSessionQuery = {
  getSession?:  {
    __typename: "Session",
    id: string,
    isTraining?: boolean | null,
    createdAt?: string | null,
    streamingStarted: number,
    streamingFreqency: number,
    accerationX: Array< number >,
    accerationY: Array< number >,
    accerationZ: Array< number >,
    gyroX: Array< number >,
    gyroY: Array< number >,
    gyroZ: Array< number >,
    tags?:  {
      __typename: "ModelSessionTagsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    sessionGroupSessionsId?: string | null,
    owner?: string | null,
  } | null,
};

export type ListSessionsQueryVariables = {
  filter?: ModelSessionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSessionsQuery = {
  listSessions?:  {
    __typename: "ModelSessionConnection",
    items:  Array< {
      __typename: "Session",
      id: string,
      isTraining?: boolean | null,
      createdAt?: string | null,
      streamingStarted: number,
      streamingFreqency: number,
      accerationX: Array< number >,
      accerationY: Array< number >,
      accerationZ: Array< number >,
      gyroX: Array< number >,
      gyroY: Array< number >,
      gyroZ: Array< number >,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      sessionGroupSessionsId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncSessionsQueryVariables = {
  filter?: ModelSessionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncSessionsQuery = {
  syncSessions?:  {
    __typename: "ModelSessionConnection",
    items:  Array< {
      __typename: "Session",
      id: string,
      isTraining?: boolean | null,
      createdAt?: string | null,
      streamingStarted: number,
      streamingFreqency: number,
      accerationX: Array< number >,
      accerationY: Array< number >,
      accerationZ: Array< number >,
      gyroX: Array< number >,
      gyroY: Array< number >,
      gyroZ: Array< number >,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      sessionGroupSessionsId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetTagQueryVariables = {
  id: string,
};

export type GetTagQuery = {
  getTag?:  {
    __typename: "Tag",
    id: string,
    createdAt?: string | null,
    name: string,
    value: string,
    sessions?:  {
      __typename: "ModelSessionTagsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListTagsQueryVariables = {
  filter?: ModelTagFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTagsQuery = {
  listTags?:  {
    __typename: "ModelTagConnection",
    items:  Array< {
      __typename: "Tag",
      id: string,
      createdAt?: string | null,
      name: string,
      value: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncTagsQueryVariables = {
  filter?: ModelTagFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncTagsQuery = {
  syncTags?:  {
    __typename: "ModelTagConnection",
    items:  Array< {
      __typename: "Tag",
      id: string,
      createdAt?: string | null,
      name: string,
      value: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetSessionTagsQueryVariables = {
  id: string,
};

export type GetSessionTagsQuery = {
  getSessionTags?:  {
    __typename: "SessionTags",
    id: string,
    sessionID: string,
    tagID: string,
    session:  {
      __typename: "Session",
      id: string,
      isTraining?: boolean | null,
      createdAt?: string | null,
      streamingStarted: number,
      streamingFreqency: number,
      accerationX: Array< number >,
      accerationY: Array< number >,
      accerationZ: Array< number >,
      gyroX: Array< number >,
      gyroY: Array< number >,
      gyroZ: Array< number >,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      sessionGroupSessionsId?: string | null,
      owner?: string | null,
    },
    tag:  {
      __typename: "Tag",
      id: string,
      createdAt?: string | null,
      name: string,
      value: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type ListSessionTagsQueryVariables = {
  filter?: ModelSessionTagsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSessionTagsQuery = {
  listSessionTags?:  {
    __typename: "ModelSessionTagsConnection",
    items:  Array< {
      __typename: "SessionTags",
      id: string,
      sessionID: string,
      tagID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncSessionTagsQueryVariables = {
  filter?: ModelSessionTagsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncSessionTagsQuery = {
  syncSessionTags?:  {
    __typename: "ModelSessionTagsConnection",
    items:  Array< {
      __typename: "SessionTags",
      id: string,
      sessionID: string,
      tagID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateSessionGroupSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateSessionGroupSubscription = {
  onCreateSessionGroup?:  {
    __typename: "SessionGroup",
    id: string,
    move?:  {
      __typename: "Move",
      id: string,
      createdAt?: string | null,
      type: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    sessions?:  {
      __typename: "ModelSessionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    sessionGroupMoveId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateSessionGroupSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateSessionGroupSubscription = {
  onUpdateSessionGroup?:  {
    __typename: "SessionGroup",
    id: string,
    move?:  {
      __typename: "Move",
      id: string,
      createdAt?: string | null,
      type: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    sessions?:  {
      __typename: "ModelSessionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    sessionGroupMoveId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteSessionGroupSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteSessionGroupSubscription = {
  onDeleteSessionGroup?:  {
    __typename: "SessionGroup",
    id: string,
    move?:  {
      __typename: "Move",
      id: string,
      createdAt?: string | null,
      type: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    sessions?:  {
      __typename: "ModelSessionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    sessionGroupMoveId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnCreateMoveSubscription = {
  onCreateMove?:  {
    __typename: "Move",
    id: string,
    createdAt?: string | null,
    type: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateMoveSubscription = {
  onUpdateMove?:  {
    __typename: "Move",
    id: string,
    createdAt?: string | null,
    type: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteMoveSubscription = {
  onDeleteMove?:  {
    __typename: "Move",
    id: string,
    createdAt?: string | null,
    type: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateSessionSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateSessionSubscription = {
  onCreateSession?:  {
    __typename: "Session",
    id: string,
    isTraining?: boolean | null,
    createdAt?: string | null,
    streamingStarted: number,
    streamingFreqency: number,
    accerationX: Array< number >,
    accerationY: Array< number >,
    accerationZ: Array< number >,
    gyroX: Array< number >,
    gyroY: Array< number >,
    gyroZ: Array< number >,
    tags?:  {
      __typename: "ModelSessionTagsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    sessionGroupSessionsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateSessionSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateSessionSubscription = {
  onUpdateSession?:  {
    __typename: "Session",
    id: string,
    isTraining?: boolean | null,
    createdAt?: string | null,
    streamingStarted: number,
    streamingFreqency: number,
    accerationX: Array< number >,
    accerationY: Array< number >,
    accerationZ: Array< number >,
    gyroX: Array< number >,
    gyroY: Array< number >,
    gyroZ: Array< number >,
    tags?:  {
      __typename: "ModelSessionTagsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    sessionGroupSessionsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteSessionSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteSessionSubscription = {
  onDeleteSession?:  {
    __typename: "Session",
    id: string,
    isTraining?: boolean | null,
    createdAt?: string | null,
    streamingStarted: number,
    streamingFreqency: number,
    accerationX: Array< number >,
    accerationY: Array< number >,
    accerationZ: Array< number >,
    gyroX: Array< number >,
    gyroY: Array< number >,
    gyroZ: Array< number >,
    tags?:  {
      __typename: "ModelSessionTagsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    sessionGroupSessionsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnCreateTagSubscription = {
  onCreateTag?:  {
    __typename: "Tag",
    id: string,
    createdAt?: string | null,
    name: string,
    value: string,
    sessions?:  {
      __typename: "ModelSessionTagsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateTagSubscription = {
  onUpdateTag?:  {
    __typename: "Tag",
    id: string,
    createdAt?: string | null,
    name: string,
    value: string,
    sessions?:  {
      __typename: "ModelSessionTagsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteTagSubscription = {
  onDeleteTag?:  {
    __typename: "Tag",
    id: string,
    createdAt?: string | null,
    name: string,
    value: string,
    sessions?:  {
      __typename: "ModelSessionTagsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateSessionTagsSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateSessionTagsSubscription = {
  onCreateSessionTags?:  {
    __typename: "SessionTags",
    id: string,
    sessionID: string,
    tagID: string,
    session:  {
      __typename: "Session",
      id: string,
      isTraining?: boolean | null,
      createdAt?: string | null,
      streamingStarted: number,
      streamingFreqency: number,
      accerationX: Array< number >,
      accerationY: Array< number >,
      accerationZ: Array< number >,
      gyroX: Array< number >,
      gyroY: Array< number >,
      gyroZ: Array< number >,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      sessionGroupSessionsId?: string | null,
      owner?: string | null,
    },
    tag:  {
      __typename: "Tag",
      id: string,
      createdAt?: string | null,
      name: string,
      value: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnUpdateSessionTagsSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateSessionTagsSubscription = {
  onUpdateSessionTags?:  {
    __typename: "SessionTags",
    id: string,
    sessionID: string,
    tagID: string,
    session:  {
      __typename: "Session",
      id: string,
      isTraining?: boolean | null,
      createdAt?: string | null,
      streamingStarted: number,
      streamingFreqency: number,
      accerationX: Array< number >,
      accerationY: Array< number >,
      accerationZ: Array< number >,
      gyroX: Array< number >,
      gyroY: Array< number >,
      gyroZ: Array< number >,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      sessionGroupSessionsId?: string | null,
      owner?: string | null,
    },
    tag:  {
      __typename: "Tag",
      id: string,
      createdAt?: string | null,
      name: string,
      value: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnDeleteSessionTagsSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteSessionTagsSubscription = {
  onDeleteSessionTags?:  {
    __typename: "SessionTags",
    id: string,
    sessionID: string,
    tagID: string,
    session:  {
      __typename: "Session",
      id: string,
      isTraining?: boolean | null,
      createdAt?: string | null,
      streamingStarted: number,
      streamingFreqency: number,
      accerationX: Array< number >,
      accerationY: Array< number >,
      accerationZ: Array< number >,
      gyroX: Array< number >,
      gyroY: Array< number >,
      gyroZ: Array< number >,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      sessionGroupSessionsId?: string | null,
      owner?: string | null,
    },
    tag:  {
      __typename: "Tag",
      id: string,
      createdAt?: string | null,
      name: string,
      value: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};
