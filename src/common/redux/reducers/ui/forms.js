import * as types from '../../actions/ui/forms';

export const initialState = {
  loginError: undefined,
  signupError: undefined
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.LOGIN_SUBMIT_ERROR:
      return {
        ...state,
        loginError: action.payload.error
      };
    case types.SIGNUP_SUBMIT_ERROR:
      return {
        ...state,
        signupError: action.payload.error
      };
    case types.CLEAR_AUTH_ERRORS:
      return {
        ...state,
        loginError: undefined,
        signupError: undefined
      };
    default:
      return {
        ...state
      };
  }
}
