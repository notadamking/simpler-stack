import { expect } from 'chai';

import * as actions from './modals';
import * as types from './modals';

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

describe('Action::closeModals', () => {
  it('returns action with CLOSE_MODALS type', () => {
    expect(actions.closeModals()).to.contain({ type: types.CLOSE_MODALS });
  });
});
