/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSessionGroup = /* GraphQL */ `
  subscription OnCreateSessionGroup($owner: String) {
    onCreateSessionGroup(owner: $owner) {
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
export const onUpdateSessionGroup = /* GraphQL */ `
  subscription OnUpdateSessionGroup($owner: String) {
    onUpdateSessionGroup(owner: $owner) {
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
export const onDeleteSessionGroup = /* GraphQL */ `
  subscription OnDeleteSessionGroup($owner: String) {
    onDeleteSessionGroup(owner: $owner) {
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
export const onCreateMove = /* GraphQL */ `
  subscription OnCreateMove {
    onCreateMove {
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
export const onUpdateMove = /* GraphQL */ `
  subscription OnUpdateMove {
    onUpdateMove {
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
export const onDeleteMove = /* GraphQL */ `
  subscription OnDeleteMove {
    onDeleteMove {
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
export const onCreateSession = /* GraphQL */ `
  subscription OnCreateSession($owner: String) {
    onCreateSession(owner: $owner) {
      id
      isTraining
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
      sessionGroupSessionsId
      owner
    }
  }
`;
export const onUpdateSession = /* GraphQL */ `
  subscription OnUpdateSession($owner: String) {
    onUpdateSession(owner: $owner) {
      id
      isTraining
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
      sessionGroupSessionsId
      owner
    }
  }
`;
export const onDeleteSession = /* GraphQL */ `
  subscription OnDeleteSession($owner: String) {
    onDeleteSession(owner: $owner) {
      id
      isTraining
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
      sessionGroupSessionsId
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
        isTraining
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
export const onUpdateSessionTags = /* GraphQL */ `
  subscription OnUpdateSessionTags($owner: String) {
    onUpdateSessionTags(owner: $owner) {
      id
      sessionID
      tagID
      session {
        id
        isTraining
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
export const onDeleteSessionTags = /* GraphQL */ `
  subscription OnDeleteSessionTags($owner: String) {
    onDeleteSessionTags(owner: $owner) {
      id
      sessionID
      tagID
      session {
        id
        isTraining
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
