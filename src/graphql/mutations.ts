/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSessionGroup = /* GraphQL */ `
  mutation CreateSessionGroup(
    $input: CreateSessionGroupInput!
    $condition: ModelSessionGroupConditionInput
  ) {
    createSessionGroup(input: $input, condition: $condition) {
      id
      move {
        id
        createdAt
        type
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      sessions {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      sessionGroupMoveId
      owner
    }
  }
`;
export const updateSessionGroup = /* GraphQL */ `
  mutation UpdateSessionGroup(
    $input: UpdateSessionGroupInput!
    $condition: ModelSessionGroupConditionInput
  ) {
    updateSessionGroup(input: $input, condition: $condition) {
      id
      move {
        id
        createdAt
        type
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      sessions {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      sessionGroupMoveId
      owner
    }
  }
`;
export const deleteSessionGroup = /* GraphQL */ `
  mutation DeleteSessionGroup(
    $input: DeleteSessionGroupInput!
    $condition: ModelSessionGroupConditionInput
  ) {
    deleteSessionGroup(input: $input, condition: $condition) {
      id
      move {
        id
        createdAt
        type
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      sessions {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      sessionGroupMoveId
      owner
    }
  }
`;
export const createMove = /* GraphQL */ `
  mutation CreateMove(
    $input: CreateMoveInput!
    $condition: ModelMoveConditionInput
  ) {
    createMove(input: $input, condition: $condition) {
      id
      createdAt
      type
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateMove = /* GraphQL */ `
  mutation UpdateMove(
    $input: UpdateMoveInput!
    $condition: ModelMoveConditionInput
  ) {
    updateMove(input: $input, condition: $condition) {
      id
      createdAt
      type
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteMove = /* GraphQL */ `
  mutation DeleteMove(
    $input: DeleteMoveInput!
    $condition: ModelMoveConditionInput
  ) {
    deleteMove(input: $input, condition: $condition) {
      id
      createdAt
      type
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createSession = /* GraphQL */ `
  mutation CreateSession(
    $input: CreateSessionInput!
    $condition: ModelSessionConditionInput
  ) {
    createSession(input: $input, condition: $condition) {
      id
      createdAt
      quaternionTimestamp
      quaternionW
      quaternionX
      quaternionY
      quaternionZ
      linearAccerationTimestamp
      linearAccerationX
      linearAccerationY
      linearAccerationZ
      tags {
        nextToken
        startedAt
      }
      updatedAt
      _version
      _deleted
      _lastChangedAt
      sessionGroupSessionsId
      owner
    }
  }
`;
export const updateSession = /* GraphQL */ `
  mutation UpdateSession(
    $input: UpdateSessionInput!
    $condition: ModelSessionConditionInput
  ) {
    updateSession(input: $input, condition: $condition) {
      id
      createdAt
      quaternionTimestamp
      quaternionW
      quaternionX
      quaternionY
      quaternionZ
      linearAccerationTimestamp
      linearAccerationX
      linearAccerationY
      linearAccerationZ
      tags {
        nextToken
        startedAt
      }
      updatedAt
      _version
      _deleted
      _lastChangedAt
      sessionGroupSessionsId
      owner
    }
  }
`;
export const deleteSession = /* GraphQL */ `
  mutation DeleteSession(
    $input: DeleteSessionInput!
    $condition: ModelSessionConditionInput
  ) {
    deleteSession(input: $input, condition: $condition) {
      id
      createdAt
      quaternionTimestamp
      quaternionW
      quaternionX
      quaternionY
      quaternionZ
      linearAccerationTimestamp
      linearAccerationX
      linearAccerationY
      linearAccerationZ
      tags {
        nextToken
        startedAt
      }
      updatedAt
      _version
      _deleted
      _lastChangedAt
      sessionGroupSessionsId
      owner
    }
  }
`;
export const createTag = /* GraphQL */ `
  mutation CreateTag(
    $input: CreateTagInput!
    $condition: ModelTagConditionInput
  ) {
    createTag(input: $input, condition: $condition) {
      id
      createdAt
      name
      value
      sessions {
        nextToken
        startedAt
      }
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateTag = /* GraphQL */ `
  mutation UpdateTag(
    $input: UpdateTagInput!
    $condition: ModelTagConditionInput
  ) {
    updateTag(input: $input, condition: $condition) {
      id
      createdAt
      name
      value
      sessions {
        nextToken
        startedAt
      }
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteTag = /* GraphQL */ `
  mutation DeleteTag(
    $input: DeleteTagInput!
    $condition: ModelTagConditionInput
  ) {
    deleteTag(input: $input, condition: $condition) {
      id
      createdAt
      name
      value
      sessions {
        nextToken
        startedAt
      }
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createSessionTags = /* GraphQL */ `
  mutation CreateSessionTags(
    $input: CreateSessionTagsInput!
    $condition: ModelSessionTagsConditionInput
  ) {
    createSessionTags(input: $input, condition: $condition) {
      id
      sessionID
      tagID
      session {
        id
        createdAt
        quaternionTimestamp
        quaternionW
        quaternionX
        quaternionY
        quaternionZ
        linearAccerationTimestamp
        linearAccerationX
        linearAccerationY
        linearAccerationZ
        updatedAt
        _version
        _deleted
        _lastChangedAt
        sessionGroupSessionsId
        owner
      }
      tag {
        id
        createdAt
        name
        value
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const updateSessionTags = /* GraphQL */ `
  mutation UpdateSessionTags(
    $input: UpdateSessionTagsInput!
    $condition: ModelSessionTagsConditionInput
  ) {
    updateSessionTags(input: $input, condition: $condition) {
      id
      sessionID
      tagID
      session {
        id
        createdAt
        quaternionTimestamp
        quaternionW
        quaternionX
        quaternionY
        quaternionZ
        linearAccerationTimestamp
        linearAccerationX
        linearAccerationY
        linearAccerationZ
        updatedAt
        _version
        _deleted
        _lastChangedAt
        sessionGroupSessionsId
        owner
      }
      tag {
        id
        createdAt
        name
        value
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const deleteSessionTags = /* GraphQL */ `
  mutation DeleteSessionTags(
    $input: DeleteSessionTagsInput!
    $condition: ModelSessionTagsConditionInput
  ) {
    deleteSessionTags(input: $input, condition: $condition) {
      id
      sessionID
      tagID
      session {
        id
        createdAt
        quaternionTimestamp
        quaternionW
        quaternionX
        quaternionY
        quaternionZ
        linearAccerationTimestamp
        linearAccerationX
        linearAccerationY
        linearAccerationZ
        updatedAt
        _version
        _deleted
        _lastChangedAt
        sessionGroupSessionsId
        owner
      }
      tag {
        id
        createdAt
        name
        value
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
