/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSession = /* GraphQL */ `
  mutation CreateSession(
    $input: CreateSessionInput!
    $condition: ModelSessionConditionInput
  ) {
    createSession(input: $input, condition: $condition) {
      id
      createdAt
      streamingStarted
      streamingFreqency
      accerationX
      accerationY
      accerationZ
      gyroX
      gyroY
      gyroZ
      tags {
        nextToken
        startedAt
      }
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      streamingStarted
      streamingFreqency
      accerationX
      accerationY
      accerationZ
      gyroX
      gyroY
      gyroZ
      tags {
        nextToken
        startedAt
      }
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      streamingStarted
      streamingFreqency
      accerationX
      accerationY
      accerationZ
      gyroX
      gyroY
      gyroZ
      tags {
        nextToken
        startedAt
      }
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      sessoins {
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
      sessoins {
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
      sessoins {
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
        streamingStarted
        streamingFreqency
        accerationX
        accerationY
        accerationZ
        gyroX
        gyroY
        gyroZ
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
        streamingStarted
        streamingFreqency
        accerationX
        accerationY
        accerationZ
        gyroX
        gyroY
        gyroZ
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
        streamingStarted
        streamingFreqency
        accerationX
        accerationY
        accerationZ
        gyroX
        gyroY
        gyroZ
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
