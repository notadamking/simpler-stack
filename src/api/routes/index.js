import Users from './users';
import Landing from './landing';
import User from '../models/user';

module.exports = router => {
  router.get('/', Landing.index);
  // router.get('/verify', ensureAuthenticated, Landing.index);
  router.post('/signup', Users.signup);
  router.post('/login', Users.login);
};
