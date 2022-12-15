/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      sections {
        items {
          id
          sessionId
          start
          end
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
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
        sections {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
        sections {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const getSessionSection = /* GraphQL */ `
  query GetSessionSection($id: ID!, $start: Float!) {
    getSessionSection(id: $id, start: $start) {
      id
      sessionId
      start
      end
      session {
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
        sections {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
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
export const listSessionSections = /* GraphQL */ `
  query ListSessionSections(
    $id: ID
    $start: ModelFloatKeyConditionInput
    $filter: ModelSessionSectionFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSessionSections(
      id: $id
      start: $start
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        sessionId
        start
        end
        session {
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
          owner
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncSessionSections = /* GraphQL */ `
  query SyncSessionSections(
    $filter: ModelSessionSectionFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSessionSections(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        sessionId
        start
        end
        session {
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
          owner
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
