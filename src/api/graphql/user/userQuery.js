import {
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';
import {
  GraphQLEmailType,
  GraphQLPasswordType
} from '../types';
import User, { UserType, AuthedUserType } from '../../models/user';
import { isEmpty } from 'lodash';

export default {
  loginUser: {
    type: AuthedUserType,
    args: {
      email: {
        name: 'email',
        type: new GraphQLNonNull(GraphQLEmailType)
      },
      password: {
        name: 'password',
        type: new GraphQLNonNull(GraphQLPasswordType)
      }
    },
    resolve: async (root, { email, password }) => {
      const users = await User.filter({ email });
      console.log(users);
      if (isEmpty(users)) {
        throw new Error('Could not login. No user with that email address exists.');
      }
      const user = users.model;
      const authToken = user.signJwt();
      return { user, authToken };
    }
  },
  user: {
    type: UserType,
    args: {
      id: {
        name: 'id',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: async (root, { id }) => await User.get(id)
  },
  users: {
    type: new GraphQLList(UserType),
    resolve: async () => {
      const u = await User.run();
      console.log('users', u);
      return u;
    }
  }
};
