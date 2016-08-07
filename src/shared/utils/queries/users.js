import gql from 'graphql-tag';

export const getUsersQuery = {
  query: gql`
  query users {
    users {
      id,
      email
    }
  }
  `
};
