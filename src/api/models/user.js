import Promise from 'bluebird';
import thinky from '../thinky';
import uuid from 'node-uuid';
import jwt from 'jsonwebtoken';
import { secretKey, isProduction } from '../../config';
import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import {
  GraphQLEmailType
} from '../graphql/types';
import { isEmail } from 'validator';

const { type } = thinky;
const bcrypt = Promise.promisifyAll(require('bcryptjs'));

const User = thinky.createModel('user', {
  id: type.string().default(uuid.v4()),
  email: type.string().validator(isEmail),
  salt: type.string(),
  hash: type.string(),
});

export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A user',
  fields: () => ({
    id: {
      type: GraphQLString,
      description: `The user's unique id string`
    },
    email: {
      type: GraphQLEmailType,
      description: `The user's email address`
    },
    salt: {
      type: GraphQLString,
      description: `The user's password salt`
    },
    hash: {
      type: GraphQLString,
      description: `The user's password hash`
    }
  })
});

export const AuthedUserType = new GraphQLObjectType({
  name: 'AuthedUser',
  description: 'An authenticated user',
  fields: () => ({
    user: {
      type: UserType,
      description: 'An authenticated user'
    },
    authToken: {
      type: GraphQLString,
      description: 'The jwt for quick authentication'
    }
  })
});

User.ensureIndex('email');

User.define('signJwt', function signJwt() {
  return jwt.sign({ id: this.id }, secretKey, { expiresIn: '7d' });
});

User.define('validatePassword', async function validatePassword(password) {
  if (!password) { throw new Error('No password was given.'); }
  return await bcrypt.compareAsync(password, this.hash);
});

User.define('setPassword', async function setPassword(password) {
  if (!password) { throw new Error('No password was given.'); }

  // console.log(`Setting password to ${password}.`);

  const rounds = isProduction ? 12 : 10;

  this.salt = await bcrypt.genSaltAsync(rounds);
  this.hash = await bcrypt.hashAsync(password, this.salt);

  await this.save();
});

export default User;
