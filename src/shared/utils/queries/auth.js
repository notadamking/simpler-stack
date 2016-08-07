import gql from 'graphql-tag';

export const currentUserQuery = () => {
  return {
    query: gql`
    query currentUser {
      currentUser {
        id
        email
      }
    }
    `
  };
};

export const loginUserQuery = ({ email, password }) => {
  return {
    query: gql`
      query User($email: Email!, $password: Password!) {
        loginUser(email: $email, password: $password) {
          id
          email
          authToken
        }
      }
    `,
    variables: {
      email,
      password
    }
  };
};

export const signupUserQuery = ({ name, email, password }) => {
  return {
    mutation: gql`
      mutation User($name: String!, $email: Email!, $password: Password!) {
        createUser(name: $name, email: $email, password: $password) {
          id
          name
          email
          authToken
        }
      }
    `,
    variables: {
      name,
      email,
      password
    },
    updateQueries: {
      users: (previousResult, { mutationResult }) => {
        return {
          users: [ ...previousResult.users, mutationResult.data.createUser ]
        };
      }
    },
    optimisticResponse: {
      createUser: {
        id: 0,
        authToken: 0,
        name,
        email,
      }
    }
  };
};
