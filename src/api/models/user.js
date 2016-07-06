import Promise from 'bluebird';
import jwt from 'jwt-simple';
import thinky from '../thinky';
import uuid from 'node-uuid';
import { SECRET_KEY } from '../../config';

const { type } = thinky;
const bcrypt = Promise.promisifyAll(require('bcryptjs'));

const User = thinky.createModel('user', {
  id: type.string().default(uuid.v4()),
  email: type.string(),
  salt: type.string(),
  hash: type.string(),
});

User.defineStatic('validateToken', async token => {
  const payload = jwt.decode(token, SECRET_KEY);
  return await this.findById(payload.sub);
});

User.define('getToken', async () => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: this.id, iat: timestamp }, SECRET_KEY);
});

User.define('validatePassword', async password => {
  if (!password) { throw new Error('No password was given.'); }
  return await bcrypt.compareAsync(password, this.hash);
});

User.define('setPassword', async password => {
  if (!password) { throw new Error('No password was given.'); }

  // console.log(`Setting password to ${password}.`);

  this.salt = await bcrypt.genSaltAsync();
  this.hash = await bcrypt.hashAsync(password, this.salt);

  await this.save();
});

export default User;
