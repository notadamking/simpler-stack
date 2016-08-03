import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';

import auth from './auth';
import ui from './ui';

export const createReducers = (client) => combineReducers({
  routing,
  form,
  auth,
  ui,
  apollo: client.reducer()
});
