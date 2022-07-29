/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSession = /* GraphQL */ `
  subscription OnCreateSession($owner: String) {
    onCreateSession(owner: $owner) {
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
export const onUpdateSession = /* GraphQL */ `
  subscription OnUpdateSession($owner: String) {
    onUpdateSession(owner: $owner) {
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
export const onDeleteSession = /* GraphQL */ `
  subscription OnDeleteSession($owner: String) {
    onDeleteSession(owner: $owner) {
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
export const onCreateTag = /* GraphQL */ `
  subscription OnCreateTag {
    onCreateTag {
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
export const onUpdateTag = /* GraphQL */ `
  subscription OnUpdateTag {
    onUpdateTag {
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
export const onDeleteTag = /* GraphQL */ `
  subscription OnDeleteTag {
    onDeleteTag {
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
export const onCreateSessionTags = /* GraphQL */ `
  subscription OnCreateSessionTags($owner: String) {
    onCreateSessionTags(owner: $owner) {
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
export const onUpdateSessionTags = /* GraphQL */ `
  subscription OnUpdateSessionTags($owner: String) {
    onUpdateSessionTags(owner: $owner) {
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
export const onDeleteSessionTags = /* GraphQL */ `
  subscription OnDeleteSessionTags($owner: String) {
    onDeleteSessionTags(owner: $owner) {
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
