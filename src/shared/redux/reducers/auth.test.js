import { expect } from 'chai';

import reducer, { initialState } from './auth';
import * as types from '../actions/auth';

describe('Reducers::auth', () => {
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
        error: undefined
      });
    });
  });

  describe('Reducer::CHECK_TOKEN_REQUEST', () => {
    it('sets authenticating to true', () => {
      expect(reducer(initialState, {
        type: types.CHECK_TOKEN_REQUEST
      })).to.eql({
        ...initialState,
        authenticating: true
      });
    });
  });

  describe('Reducer::SIGNUP_REQUEST', () => {
    it('sets authenticating to true', () => {
      expect(reducer(initialState, {
        type: types.SIGNUP_REQUEST
      })).to.eql({
        ...initialState,
        authenticating: true
      });
    });
  });

  describe('Reducer::SIGNUP_SUCCESS', () => {
    it('sets authenticated to true, user to payload.user, and resets authenticating/error', () => {
      expect(reducer(initialState, {
        type: types.SIGNUP_SUCCESS,
        payload: {
          user: { id: 1 }
        }
      })).to.eql({
        ...initialState,
        authenticated: true,
        authenticating: false,
        user: { id: 1 },
        error: undefined
      });
    });
  });

  describe('Reducer::SIGNUP_FAILURE', () => {
    it('sets authenticated to false, error to payload.error, and resets authenticating/user', () => {
      expect(reducer(initialState, {
        type: types.SIGNUP_FAILURE,
        payload: {
          error: 'error'
        }
      })).to.eql({
        ...initialState,
        authenticated: false,
        authenticating: false,
        user: undefined,
        error: 'error'
      });
    });
  });

  describe('Reducer::LOGIN_REQUEST', () => {
    it('sets authenticating to true', () => {
      expect(reducer(initialState, {
        type: types.LOGIN_REQUEST
      })).to.eql({
        ...initialState,
        authenticating: true
      });
    });
  });

  describe('Reducer::LOGIN_SUCCESS', () => {
    it('sets authenticated to true, user to payload.user, and resets authenticating/error', () => {
      expect(reducer(initialState, {
        type: types.LOGIN_SUCCESS,
        payload: {
          user: { id: 1 }
        }
      })).to.eql({
        ...initialState,
        authenticated: true,
        authenticating: false,
        user: { id: 1 },
        error: undefined
      });
    });
  });

  describe('Reducer::LOGIN_FAILURE', () => {
    it('sets authenticated to false, error to payload.error, and resets authenticating/user', () => {
      expect(reducer(initialState, {
        type: types.LOGIN_FAILURE,
        payload: {
          error: 'error'
        }
      })).to.eql({
        ...initialState,
        authenticated: false,
        authenticating: false,
        user: undefined,
        error: 'error'
      });
    });
  });

  describe('Reducer::LOGOUT', () => {
    it('sets authenticated to false and resets user', () => {
      expect(reducer(initialState, {
        type: types.LOGOUT
      })).to.eql({
        ...initialState,
        authenticated: false,
        user: undefined
      });
    });
  });
});
