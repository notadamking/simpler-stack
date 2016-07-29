import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import { auth } from './modules';

export const createReducers = (client) => combineReducers({
  routing,
  form,
  auth,
  apollo: client.reducer()
});
