export const SessionsForTag = /* GraphQL */ `
  query SessionsForTag($tag: ID!) {
    getTag(id: $tag) {
      sessions {
        items {
          session {
            id
            tags {
              items {
                tag {
                  name
                  value
                }
              }
            }
            streamingStarted
            _lastChangedAt
          }
        }
      }
    }
  }
`;

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type SessionsForTagQueryVariables = Exact<{
  tag: Scalars['ID'];
}>;

export type SessionsForTagQuery = {
  __typename?: 'Query';
  getTag?: {
    __typename?: 'Tag';
    sessions?: {
      __typename?: 'ModelSessionTagsConnection';
      items: Array<{
        __typename?: 'SessionTags';
        session: {
          __typename?: 'Session';
          id: string;
          streamingStarted: number;
          _lastChangedAt: string;
          tags?: {
            __typename?: 'ModelSessionTagsConnection';
            items: Array<{
              __typename?: 'SessionTags';
              tag: { __typename?: 'Tag'; name: string; value: string };
            } | null>;
          } | null;
        };
      } | null>;
    } | null;
  } | null;
};
