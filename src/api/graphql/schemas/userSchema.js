import { isEmpty } from 'lodash';
import { User } from '../../models';

export const userTypes = `
type User {
  id: String!
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
loginUser: AuthedUser
`;

export const userMutations = `
createUser(email: Email!, password: Password!): AuthedUser
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
        throw new Error('Could not login. No user with that email address exists.');
      }
      const user = users.model;
      const authToken = user.signJwt();
      return { user, authToken };
    },
  },
  Mutation: {
    createUser: async (root, { email, password }) => {
      const exists = await User.filter({ email });
      if (!isEmpty(exists)) {
        throw new Error('Cannot create user. Email address is already in use.');
      }
      const user = new User({ email });
      await user.setPassword(password);
      const authToken = user.signJwt();
      return { user, authToken };
    }
  }
};
