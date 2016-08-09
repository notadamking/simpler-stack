import * as types from '../actions/auth';
import { REHYDRATE } from 'redux-persist/constants';

export const initialState = {
  authenticated: false,
  authenticating: false,
  user: undefined,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REHYDRATE:
      return {
        ...action.payload.auth
      };
    case types.CHECK_TOKEN_REQUEST:
      return {
        ...state,
        authenticating: true
      };
    case types.CHECK_TOKEN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        authenticating: false,
        user: action.payload.user
      };
    case types.CHECK_TOKEN_FAILURE:
      return {
        ...state,
        authenticated: false,
        authenticating: false,
        user: undefined
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
        user: action.payload.user
      };
    case types.SIGNUP_FAILURE:
      return {
        ...state,
        authenticated: false,
        authenticating: false,
        user: undefined
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
        user: action.payload.user
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        authenticated: false,
        authenticating: false,
        user: undefined
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
