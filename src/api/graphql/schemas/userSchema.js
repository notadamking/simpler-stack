import { isEmpty, head } from 'lodash';
import { User } from '../../models';

export const userTypes = `
  type User {
    id: String!
    name: String!
    email: Email!
  }

  type AuthedUser {
    user: User!
    authToken: String!
  }
`;

export const userQueries = `
  user(id: String!): User
  users: [User]
  currentUser: User
  loginUser(email: Email!, password: Password!): AuthedUser
`;

export const userMutations = `
  createUser(name: String!, email: Email!, password: Password!): AuthedUser
`;

export const userResolvers = {
  AuthedUser: {
    user: (authedUser) => authedUser.user
  },
  Query: {
    user: async (root, { id }) => User.get(id),
    users: async () => await User.run(),
    currentUser: (_, __, context) => context.user,
    loginUser: async (root, { email, password }) => {
      const users = await User.filter({ email });
      if (isEmpty(users)) {
        throw new Error('No user with that email address exists.');
      }
      const user = head(users);
      if (!await user.validatePassword(password)) {
        throw new Error('Invalid email or password.');
      }
      const authToken = user.signJwt();
      return { user, authToken };
    },
  },
  Mutation: {
    createUser: async (root, { name, email, password }) => {
      const exists = await User.filter({ email });
      if (!isEmpty(exists)) {
        throw new Error('That email address is already in use.');
      }
      const user = new User({ name, email });
      await user.setPassword(password);
      const authToken = user.signJwt();
      return { user, authToken };
    }
  }
};
