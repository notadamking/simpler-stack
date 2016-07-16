import {
  GraphQLString,
  GraphQLNonNull
} from 'graphql';
import {
  GraphQLEmailType,
  GraphQLPasswordType
} from '../types';
import { UserType, AuthedUserType } from '../../models/user';
import { User } from '../../models';
import { isEmpty } from 'lodash';

export default {
  createUser: {
    type: AuthedUserType,
    args: {
      email: { type: new GraphQLNonNull(GraphQLEmailType) },
      password: { type: new GraphQLNonNull(GraphQLPasswordType) }
    },
    resolve: async (root, { email, password }) => {
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
