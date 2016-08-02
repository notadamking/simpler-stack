import * as types from '../actions/auth';

export const initialState = {
  authenticated: false,
  authenticating: false,
  user: undefined,
  error: undefined,
  shouldShowLogin: false,
  shouldShowSignup: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.CLEAR_AUTH_ERRORS:
      return {
        ...state,
        error: undefined
      };
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
    case types.CLOSE_MODAL:
      return {
        ...state,
        shouldShowLogin: false,
        shouldShowSignup: false
      };
    case types.CHECK_TOKEN_REQUEST:
      return {
        ...state,
        authenticating: true
      };
    case types.SIGNUP_REQUEST:
      return {
        ...state,
        authenticating: true
      };
    case types.SIGNUP_SUCCESS:
      return {
        ...state,
        authenticated: true,
        authenticating: false,
        user: action.payload.user,
        error: undefined
      };
    case types.SIGNUP_FAILURE:
      return {
        ...state,
        authenticated: false,
        authenticating: false,
        user: undefined,
        error: action.payload.error
      };
    case types.LOGIN_REQUEST:
      return {
        ...state,
        authenticating: true
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        authenticating: false,
        user: action.payload.user,
        error: undefined
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        authenticated: false,
        authenticating: false,
        user: undefined,
        error: action.payload.error
      };
    case types.LOGOUT:
      return {
        ...state,
        authenticated: false,
        user: undefined
      };
    default:
      return state;
  }
}
