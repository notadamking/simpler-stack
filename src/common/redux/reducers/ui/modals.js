import * as types from '../../actions/ui/modals';

export const initialState = {
  shouldShowLogin: false,
  shouldShowSignup: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.OPEN_SIGNUP_MODAL:
      return {
        ...state,
        shouldShowSignup: true
      };
    case types.OPEN_LOGIN_MODAL:
      return {
        ...state,
        shouldShowLogin: true
      };
    case types.CLOSE_MODALS:
      return {
        ...state,
        shouldShowLogin: false,
        shouldShowSignup: false
      };
    default:
      return state;
  }
}
