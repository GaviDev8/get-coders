import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      name
      skills
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($username: String!) {
    user(username: $username) {
      _id
      username
      ratings
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      ratings
    }
  }
`;
