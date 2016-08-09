import { expect } from 'chai';

import reducer, { initialState } from './forms';
import * as types from '../../actions/ui/forms';

describe('Reducers::ui/forms', () => {
  it('returns the correct initial state', () => {
    expect(reducer(undefined, {})).to.eql(initialState);
  });

  it('returns the current state on unrecognized reducer', () => {
    expect(reducer(initialState, {
      type: 'unrecognized'
    })).to.eql(initialState);
  });

  describe('Reducer::CLEAR_AUTH_ERRORS', () => {
    it('removes any errors from auth state', () => {
      expect(reducer(initialState, {
        type: types.CLEAR_AUTH_ERRORS
      })).to.eql({
        ...initialState,
        loginError: undefined,
        signupError: undefined
      });
    });
  });
});
