import { takeEvery } from 'redux-saga';
import { take, put, call, fork } from 'redux-saga/effects';
import { head, isEmpty } from 'lodash';
import { authTokenName } from '../../../config';
import { currentUserQuery, loginUserQuery, signupUserQuery } from '../../utils/queries';

export const CLEAR_ERRORS = 'auth/clear_errors';
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
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
export const loginSuccess = (user, authToken) => {
  if (!isEmpty(authToken)) {
    localStorage.setItem(authTokenName, authToken);
  }
  return {
    type: LOGIN_SUCCESS,
    user
  };
};

export const LOGIN_FAILURE = 'auth/login_failure';
export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    error
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
export const signupSuccess = (user, authToken) => {
  localStorage.setItem(authTokenName, authToken);
  return {
    type: SIGNUP_SUCCESS,
    user
  };
};

export const SIGNUP_FAILURE = 'auth/signup_failure';
export const signupFailure = (error) => {
  return {
    type: SIGNUP_FAILURE,
    error
  };
};

export const LOGOUT = 'auth/logout';
export const logout = () => {
  localStorage.removeItem(authTokenName);
  return {
    type: LOGOUT
  };
};

const initialState = {
  authenticated: false,
  authenticating: false,
  user: undefined,
  error: undefined,
  shouldShowLogin: false,
  shouldShowSignup: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CLEAR_ERRORS:
      return {
        ...state,
        error: undefined
      };
    case OPEN_SIGNUP_MODAL:
      return {
        ...state,
        shouldShowSignup: true
      };
    case OPEN_LOGIN_MODAL:
      return {
        ...state,
        shouldShowLogin: true
      };
    case CLOSE_MODAL:
      return {
        ...state,
        shouldShowLogin: false,
        shouldShowSignup: false
      };
    case CHECK_TOKEN_REQUEST:
      return {
        ...state,
        authenticating: true
      };
    case SIGNUP_REQUEST:
      return {
        ...state,
        authenticating: true
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        authenticated: true,
        authenticating: false,
        user: action.user,
        error: undefined
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        authenticated: false,
        authenticating: false,
        user: undefined,
        error: action.error
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        authenticating: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        authenticating: false,
        user: action.user,
        error: undefined
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        authenticated: false,
        authenticating: false,
        user: undefined,
        error: action.error
      };
    case LOGOUT:
      return {
        ...state,
        authenticated: false,
        user: undefined
      };
    default:
      return state;
  }
}

function *checkTokenSaga(action) {
  if (!__CLIENT__) { return; }
  const { client } = action.payload;

  try {
    const { data: { currentUser } } = yield call(client.query, currentUserQuery());

    if (!isEmpty(currentUser)) {
      yield put(loginSuccess(currentUser));
    } else {
      yield put(loginFailure());
    }
  } catch (error) {
    yield put(loginFailure(error));
  }
}

function *loginSaga(action) {
  const { client, email, password } = action.payload;

  try {
    const { data: { loginUser: { user, authToken } } } = yield call(client.query, loginUserQuery(email, password));

    yield put(loginSuccess(user, authToken));
    yield put(closeModal());
  } catch (error) {
    yield put(loginFailure(head(error.graphQLErrors).message));
  }
}

function *signupSaga(action) {
  const { client, name, email, password } = action.payload;

  try {
    const { data: { createUser }, errors } = yield call(client.mutate, signupUserQuery(name, email, password));

    if (!isEmpty(errors)) {
      yield put(signupFailure(head(errors).message));
    } else {
      const { user, authToken } = createUser;

      yield put(signupSuccess(user, authToken));
      yield put(closeModal());
    }
  } catch (error) {
    console.log('e: ', error);
    yield put(signupFailure(head(error.graphQLErrors).message));
  }
}

function *closeModalSaga() {
  yield put(clearErrors());
  $('.dimmed').removeClass('dimmed');
}

export function *watchAuth() {
  yield [
    takeEvery(CHECK_TOKEN_REQUEST, checkTokenSaga),
    takeEvery(LOGIN_REQUEST, loginSaga),
    takeEvery(SIGNUP_REQUEST, signupSaga),
    takeEvery(CLOSE_MODAL, closeModalSaga)
  ];
}
