import { expect } from 'chai';

import * as actions from './auth';
import * as types from './auth';

describe('Actions::auth', () => {
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
      expect(actions.loginFailure()).to.contain({ type: types.LOGIN_FAILURE });
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
    it('returns action with SIGNUP_FAILURE type', () => {
      expect(actions.signupFailure()).to.contain({ type: types.SIGNUP_FAILURE });
    });
  });

  describe('Action::logout', () => {
    it('returns action with LOGOUT type', () => {
      expect(actions.logout()).to.contain({ type: types.LOGOUT });
    });
  });
});
