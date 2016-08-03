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
      const [ user ] = await User.filter({ email });
      if (!user) {
        throw new Error('No user with that email address exists.');
      } else if (!await user.validatePassword(password)) {
        throw new Error('Invalid email or password.');
      }
      const authToken = user.signJwt();
      return { user, authToken };
    },
  },
  Mutation: {
    createUser: async (root, { name, email, password }) => {
      const [ exists ] = await User.filter({ email });
      if (exists) {
        throw new Error('That email address is already in use.');
      }
      const user = new User({ name, email });
      await user.setPassword(password);
      const authToken = user.signJwt();
      return { user, authToken };
    }
  }
};
