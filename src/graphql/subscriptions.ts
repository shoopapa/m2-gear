/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSession = /* GraphQL */ `
  subscription OnCreateSession(
    $filter: ModelSubscriptionSessionFilterInput
    $owner: String
  ) {
    onCreateSession(filter: $filter, owner: $owner) {
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
export const onUpdateSession = /* GraphQL */ `
  subscription OnUpdateSession(
    $filter: ModelSubscriptionSessionFilterInput
    $owner: String
  ) {
    onUpdateSession(filter: $filter, owner: $owner) {
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
export const onDeleteSession = /* GraphQL */ `
  subscription OnDeleteSession(
    $filter: ModelSubscriptionSessionFilterInput
    $owner: String
  ) {
    onDeleteSession(filter: $filter, owner: $owner) {
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
export const onCreateSessionSection = /* GraphQL */ `
  subscription OnCreateSessionSection(
    $filter: ModelSubscriptionSessionSectionFilterInput
    $owner: String
  ) {
    onCreateSessionSection(filter: $filter, owner: $owner) {
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
  }
`;
export const onUpdateSessionSection = /* GraphQL */ `
  subscription OnUpdateSessionSection(
    $filter: ModelSubscriptionSessionSectionFilterInput
    $owner: String
  ) {
    onUpdateSessionSection(filter: $filter, owner: $owner) {
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
  }
`;
export const onDeleteSessionSection = /* GraphQL */ `
  subscription OnDeleteSessionSection(
    $filter: ModelSubscriptionSessionSectionFilterInput
    $owner: String
  ) {
    onDeleteSessionSection(filter: $filter, owner: $owner) {
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
  }
`;
