import Promise from 'bluebird';
import jwt from 'jsonwebtoken';

import thinky from '../thinky';
import { secretKey, isProduction } from '../../config';
import Post from './post';
import Comment from './comment';

const bcrypt = Promise.promisifyAll(require('bcryptjs'));
const verifyJwt = Promise.promisify(jwt.verify);
const { type } = thinky;
const User = thinky.createModel('user', {
  id: type.string(),
  name: type.string(),
  email: type.string(),
  salt: type.string(),
  hash: type.string(),
  createdAt: type.date().default(Date.now()),
  posts: type.array().default([]),
});

User.hasMany(Post, 'posts', 'id', 'authorId');
Post.belongsTo(User, 'user', 'authorId', 'id');

Comment.hasOne(User, 'user', 'id', 'authorId');
User.belongsTo(Comment, 'comment', 'authorId', 'id');

User.define('signJwt', function signJwt() {
  return jwt.sign({ id: this.id }, secretKey, { expiresIn: '7d' });
});

User.defineStatic('fromToken', async function fromToken(token) {
  if (!token) { throw new Error('No token was given.'); }
  const { id } = await verifyJwt(token, secretKey);
  return await User.get(id);
});

User.define('validatePassword', async function validatePassword(password) {
  if (!password) { throw new Error('No password was given.'); }
  return await bcrypt.compareAsync(password, this.hash);
});

User.define('setPassword', async function setPassword(password) {
  if (!password) { throw new Error('No password was given.'); }

  const rounds = isProduction ? 12 : 10;

  this.salt = await bcrypt.genSaltAsync(rounds);
  this.hash = await bcrypt.hashAsync(password, this.salt);

  await this.save();
});

export default User;
