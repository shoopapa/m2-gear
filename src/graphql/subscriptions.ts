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
      name
      quaternionTimestamp
      quaternionW
      quaternionX
      quaternionY
      quaternionZ
      linearAccerationTimestamp
      linearAccerationX
      linearAccerationY
      linearAccerationZ
      createdAt
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
      name
      quaternionTimestamp
      quaternionW
      quaternionX
      quaternionY
      quaternionZ
      linearAccerationTimestamp
      linearAccerationX
      linearAccerationY
      linearAccerationZ
      createdAt
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
      name
      quaternionTimestamp
      quaternionW
      quaternionX
      quaternionY
      quaternionZ
      linearAccerationTimestamp
      linearAccerationX
      linearAccerationY
      linearAccerationZ
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      sessionGroupSessionsId
      owner
    }
  }
`;
