import { authTokenName } from '../../../config';

export const CLEAR_AUTH_ERRORS = 'AUTH/CLEAR_AUTH_ERRORS';
export const clearErrors = () => {
  return {
    type: CLEAR_AUTH_ERRORS
  };
};

export const CHECK_TOKEN_REQUEST = 'AUTH/CHECK_TOKEN_REQUEST';
export const checkToken = ({ client }) => {
  return {
    type: CHECK_TOKEN_REQUEST,
    payload: {
      client
    }
  };
};

export const CHECK_TOKEN_SUCCESS = 'AUTH/CHECK_TOKEN_SUCCESS';
export const tokenSuccess = ({ user }) => {
  return {
    type: CHECK_TOKEN_SUCCESS,
    payload: {
      user
    }
  };
};

export const CHECK_TOKEN_FAILURE = 'AUTH/CHECK_TOKEN_FAILURE';
export const tokenFailure = () => {
  return {
    type: CHECK_TOKEN_FAILURE
  };
};

export const LOGIN_REQUEST = 'AUTH/LOGIN_REQUEST';
export const loginUser = ({ client, email, password }) => {
  return {
    type: LOGIN_REQUEST,
    payload: {
      client,
      email,
      password
    }
  };
};

export const LOGIN_SUCCESS = 'AUTH/LOGIN_SUCCESS';
export const loginSuccess = ({ user, authToken }) => {
  if (global.localStorage && authToken) {
    localStorage.setItem(authTokenName, authToken);
  }
  return {
    type: LOGIN_SUCCESS,
    payload: {
      user
    }
  };
};

export const LOGIN_FAILURE = 'AUTH/LOGIN_FAILURE';
export const loginFailure = ({ error }) => {
  return {
    type: LOGIN_FAILURE,
    payload: {
      error
    }
  };
};

export const SIGNUP_REQUEST = 'AUTH/SIGNUP_REQUEST';
export const signupUser = ({ client, name, email, password }) => {
  return {
    type: SIGNUP_REQUEST,
    payload: {
      client,
      name,
      email,
      password
    }
  };
};

export const SIGNUP_SUCCESS = 'AUTH/SIGNUP_SUCCESS';
export const signupSuccess = ({ user, authToken }) => {
  if (global.localStorage) {
    localStorage.setItem(authTokenName, authToken);
  }
  return {
    type: SIGNUP_SUCCESS,
    payload: {
      user
    }
  };
};

export const SIGNUP_FAILURE = 'AUTH/SIGNUP_FAILURE';
export const signupFailure = ({ error }) => {
  return {
    type: SIGNUP_FAILURE,
    payload: {
      error
    }
  };
};

export const LOGOUT = 'AUTH/LOGOUT';
export const logout = () => {
  if (global.localStorage) {
    localStorage.removeItem(authTokenName);
  }
  return {
    type: LOGOUT
  };
};
