import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';

import { reducer as form } from 'redux-form';
import { reducer as users } from './users';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  form,
  users
});
