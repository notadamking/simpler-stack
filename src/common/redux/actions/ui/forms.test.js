import { expect } from 'chai';

import * as actions from './forms';
import * as types from './forms';

describe('Action::ui/forms/clearErrors', () => {
  it('returns action with CLEAR_AUTH_ERRORS type', () => {
    expect(actions.clearErrors()).to.contain({ type: types.CLEAR_AUTH_ERRORS });
  });
});

describe('Action::ui/forms/loginSubmitError', () => {
  it('returns action with LOGIN_SUBMIT_ERROR type', () => {
    expect(actions.loginSubmitError()).to.contain({ type: types.LOGIN_SUBMIT_ERROR });
  });
});

describe('Action::ui/forms/signupSubmitError', () => {
  it('returns action with SIGNUP_SUBMIT_ERROR type', () => {
    expect(actions.signupSubmitError()).to.contain({ type: types.SIGNUP_SUBMIT_ERROR });
  });
});
