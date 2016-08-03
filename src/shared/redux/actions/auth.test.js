import { expect } from 'chai';

import * as actions from './auth';
import * as types from './auth';

describe('Actions::auth', () => {
  describe('Action::clearErrors', () => {
    it('returns action with CLEAR_AUTH_ERRORS type', () => {
      expect(actions.clearErrors()).to.contain({ type: types.CLEAR_AUTH_ERRORS });
    });
  });

  describe('Action::openLoginModal', () => {
    it('returns action with OPEN_LOGIN_MODAL type', () => {
      expect(actions.openLoginModal()).to.contain({ type: types.OPEN_LOGIN_MODAL });
    });
  });

  describe('Action::openSignupModal', () => {
    it('returns action with OPEN_SIGNUP_MODAL type', () => {
      expect(actions.openSignupModal()).to.contain({ type: types.OPEN_SIGNUP_MODAL });
    });
  });

  describe('Action::closeModal', () => {
    it('returns action with CLOSE_MODAL type', () => {
      expect(actions.closeModal()).to.contain({ type: types.CLOSE_MODAL });
    });
  });

  describe('Action::loginSuccess', () => {
    it('returns action with LOGIN_SUCCESS type and user in payload', () => {
      expect(actions.loginSuccess({})).to.contain({ type: types.LOGIN_SUCCESS });
      expect(actions.loginSuccess({ user: {} }).payload.user).to.be.ok;
    });
  });

  describe('Action::loginFailure', () => {
    it('returns action with LOGIN_FAILURE type', () => {
      expect(actions.loginFailure({})).to.contain({ type: types.LOGIN_FAILURE });
    });

    it('returns action with user in payload', () => {
      expect(actions.loginFailure({ error: {} }).payload.error).to.be.ok;
    });
  });

  describe('Action::signupSuccess', () => {
    it('returns action with SIGNUP_SUCCESS type and user in payload', () => {
      expect(actions.signupSuccess({})).to.contain({ type: types.SIGNUP_SUCCESS });
      expect(actions.signupSuccess({ user: {} }).payload.user).to.be.ok;
    });
  });

  describe('Action::signupFailure', () => {
    it('returns action with SIGNUP_FAILURE type and user in payload', () => {
      expect(actions.signupFailure({})).to.contain({ type: types.SIGNUP_FAILURE });
      expect(actions.signupFailure({ error: {} }).payload.error).to.be.ok;
    });
  });

  describe('Action::logout', () => {
    it('returns action with LOGOUT type', () => {
      expect(actions.logout()).to.contain({ type: types.LOGOUT });
    });
  });
});
