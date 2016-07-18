import Promise from 'bluebird';
import thinky from '../thinky';
import jwt from 'jsonwebtoken';
import { secretKey, isProduction } from '../../config';
import { isEmail } from 'validator';

const { type } = thinky;
const bcrypt = Promise.promisifyAll(require('bcryptjs'));
const verifyJwt = Promise.promisify(jwt.verify);

const User = thinky.createModel('user', {
  id: type.string(),
  email: type.string().validator(isEmail),
  salt: type.string(),
  hash: type.string(),
});

User.define('signJwt', function signJwt() {
  return jwt.sign({ id: this.id }, secretKey, { expiresIn: '7d' });
});

User.defineStatic('fromToken', async function fromToken(token) {
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
