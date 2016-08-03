import { expect } from 'chai';

import reducer, { initialState } from './modals';
import * as types from '../../actions/ui/modals';

describe('Reducers::ui/modals', () => {
  it('returns the correct initial state', () => {
    expect(reducer(undefined, {})).to.eql(initialState);
  });

  it('returns the current state on unrecognized reducer', () => {
    expect(reducer(initialState, {
      type: 'unrecognized'
    })).to.eql(initialState);
  });

  describe('Reducer::OPEN_SIGNUP_MODAL', () => {
    it('sets shouldShowSignup to true', () => {
      expect(reducer(initialState, {
        type: types.OPEN_SIGNUP_MODAL
      })).to.eql({
        ...initialState,
        shouldShowSignup: true
      });
    });
  });

  describe('Reducer::OPEN_LOGIN_MODAL', () => {
    it('sets shouldShowLogin to true', () => {
      expect(reducer(initialState, {
        type: types.OPEN_LOGIN_MODAL
      })).to.eql({
        ...initialState,
        shouldShowLogin: true
      });
    });
  });

  describe('Reducer::CLOSE_MODALS', () => {
    it('sets shouldShowSignup and shouldShowLogin to false', () => {
      expect(reducer(initialState, {
        type: types.CLOSE_MODALS
      })).to.eql({
        ...initialState,
        shouldShowLogin: false,
        shouldShowSignup: false
      });
    });
  });
});
