/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSessionGroup = /* GraphQL */ `
  query GetSessionGroup($id: ID!) {
    getSessionGroup(id: $id) {
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
export const listSessionGroups = /* GraphQL */ `
  query ListSessionGroups(
    $filter: ModelSessionGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSessionGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        sessionGroupMoveId
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncSessionGroups = /* GraphQL */ `
  query SyncSessionGroups(
    $filter: ModelSessionGroupFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSessionGroups(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        sessionGroupMoveId
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const getMove = /* GraphQL */ `
  query GetMove($id: ID!) {
    getMove(id: $id) {
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
export const listMoves = /* GraphQL */ `
  query ListMoves(
    $filter: ModelMoveFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMoves(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        type
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncMoves = /* GraphQL */ `
  query SyncMoves(
    $filter: ModelMoveFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMoves(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        createdAt
        type
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getSession = /* GraphQL */ `
  query GetSession($id: ID!) {
    getSession(id: $id) {
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
export const listSessions = /* GraphQL */ `
  query ListSessions(
    $filter: ModelSessionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncSessions = /* GraphQL */ `
  query SyncSessions(
    $filter: ModelSessionFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSessions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
