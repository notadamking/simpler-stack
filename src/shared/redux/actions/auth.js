import { authTokenName } from '../../../config';

export const CHECK_TOKEN_REQUEST = 'auth/CHECK_TOKEN_REQUEST';
export const checkToken = ({ client }) => {
  return {
    type: CHECK_TOKEN_REQUEST,
    payload: {
      client
    }
  };
};

export const CHECK_TOKEN_SUCCESS = 'auth/CHECK_TOKEN_SUCCESS';
export const tokenSuccess = ({ user }) => {
  return {
    type: CHECK_TOKEN_SUCCESS,
    payload: {
      user
    }
  };
};

export const CHECK_TOKEN_FAILURE = 'auth/CHECK_TOKEN_FAILURE';
export const tokenFailure = () => {
  return {
    type: CHECK_TOKEN_FAILURE
  };
};

export const LOGIN_REQUEST = 'auth/LOGIN_REQUEST';
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

export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const loginSuccess = ({ user }) => {
  if (global.localStorage && user.authToken) {
    localStorage.setItem(authTokenName, user.authToken);
  }
  return {
    type: LOGIN_SUCCESS,
    payload: {
      user
    }
  };
};

export const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';
export const loginFailure = () => {
  return {
    type: LOGIN_FAILURE
  };
};

export const SIGNUP_REQUEST = 'auth/SIGNUP_REQUEST';
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

export const SIGNUP_SUCCESS = 'auth/SIGNUP_SUCCESS';
export const signupSuccess = ({ user }) => {
  if (global.localStorage && user.authToken) {
    localStorage.setItem(authTokenName, user.authToken);
  }
  return {
    type: SIGNUP_SUCCESS,
    payload: {
      user
    }
  };
};

export const SIGNUP_FAILURE = 'auth/SIGNUP_FAILURE';
export const signupFailure = () => {
  return {
    type: SIGNUP_FAILURE
  };
};

export const LOGOUT = 'auth/LOGOUT';
export const logout = () => {
  if (global.localStorage) {
    localStorage.removeItem(authTokenName);
  }
  return {
    type: LOGOUT
  };
};
