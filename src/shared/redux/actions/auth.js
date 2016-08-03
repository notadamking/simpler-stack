import { authTokenName } from '../../../config';

export const CLEAR_AUTH_ERRORS = 'auth/CLEAR_AUTH_ERRORS';
export const clearErrors = () => {
  return {
    type: CLEAR_AUTH_ERRORS
  };
};

export const OPEN_LOGIN_MODAL = 'auth/open_login_modal';
export const openLoginModal = () => {
  return {
    type: OPEN_LOGIN_MODAL
  };
};

export const OPEN_SIGNUP_MODAL = 'auth/open_signup_modal';
export const openSignupModal = () => {
  return {
    type: OPEN_SIGNUP_MODAL
  };
};

export const CLOSE_MODAL = 'auth/close_modal';
export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  };
};

export const CHECK_TOKEN_REQUEST = 'auth/check_token_request';
export const checkToken = ({ client }) => {
  return {
    type: CHECK_TOKEN_REQUEST,
    payload: {
      client
    }
  };
};

export const LOGIN_REQUEST = 'auth/login_request';
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

export const LOGIN_SUCCESS = 'auth/login_success';
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

export const LOGIN_FAILURE = 'auth/login_failure';
export const loginFailure = ({ error }) => {
  return {
    type: LOGIN_FAILURE,
    payload: {
      error
    }
  };
};

export const SIGNUP_REQUEST = 'auth/signup_request';
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

export const SIGNUP_SUCCESS = 'auth/signup_success';
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

export const SIGNUP_FAILURE = 'auth/signup_failure';
export const signupFailure = ({ error }) => {
  return {
    type: SIGNUP_FAILURE,
    payload: {
      error
    }
  };
};

export const LOGOUT = 'auth/logout';
export const logout = () => {
  if (global.localStorage) {
    localStorage.removeItem(authTokenName);
  }
  return {
    type: LOGOUT
  };
};
