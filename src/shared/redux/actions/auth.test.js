import { expect } from 'chai';

import * as actions from './auth';
import * as types from './auth';

describe('Actions::auth', () => {
  describe('Action::clearErrors', () => {
    it('returns action with CLEAR_AUTH_ERRORS type', () => {
      expect(actions.clearErrors()).to.contain({ type: types.CLEAR_AUTH_ERRORS });
    });
  });

  describe('Action::loginSuccess', () => {
    it('returns action with LOGIN_SUCCESS type', () => {
      expect(actions.loginSuccess({})).to.contain({ type: types.LOGIN_SUCCESS });
    });

    it('returns action with user in payload', () => {
      expect(actions.loginSuccess({ user: {} }).payload.user).to.be.ok;
    });
  });

  describe('Action::loginFailure', () => {
    it('returns action with LOGIN_FAILURE type', () => {
      expect(actions.loginFailure({ error: { message: '' } })).to.contain({ type: types.LOGIN_FAILURE });
    });

    it('returns action with error in payload', () => {
      expect(actions.loginFailure({ error: { message: 'error' } }).payload.error).to.be.ok;
    });
  });

  describe('Action::signupSuccess', () => {
    it('returns action with SIGNUP_SUCCESS type', () => {
      expect(actions.signupSuccess({})).to.contain({ type: types.SIGNUP_SUCCESS });
    });

    it('returns actions with user in payload', () => {
      expect(actions.signupSuccess({ user: {} }).payload.user).to.be.ok;
    });
  });

  describe('Action::signupFailure', () => {
    it('returns action with SIGNUP_FAILURE type and error in payload', () => {
      expect(actions.signupFailure({ error: { message: '' } })).to.contain({ type: types.SIGNUP_FAILURE });
    });

    it('returns actions with error in payload', () => {
      expect(actions.signupFailure({ error: { message: 'error' } }).payload.error).to.be.ok;
    });
  });

  describe('Action::logout', () => {
    it('returns action with LOGOUT type', () => {
      expect(actions.logout()).to.contain({ type: types.LOGOUT });
    });
  });
});
