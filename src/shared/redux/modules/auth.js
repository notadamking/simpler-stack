import gql from 'graphql-tag';
import { head, isEmpty } from 'lodash';
import { authTokenName } from '../../../config';

export const CLEAR_ERRORS = 'auth/clear_errors';

export const OPEN_LOGIN_MODAL = 'auth/open_login_modal';
export const CLOSE_LOGIN_MODAL = 'auth/close_login_modal';

export const OPEN_SIGNUP_MODAL = 'auth/open_signup_modal';
export const CLOSE_SIGNUP_MODAL = 'auth/close_signup_modal';

export const LOGIN_REQUEST = 'auth/login_request';
export const LOGIN_SUCCESS = 'auth/login_success';
export const LOGIN_FAILURE = 'auth/login_failure';

export const SIGNUP_REQUEST = 'auth/signup_request';
export const SIGNUP_SUCCESS = 'auth/signup_success';
export const SIGNUP_FAILURE = 'auth/signup_failure';

export const LOGOUT = 'auth/logout';

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
        error: null
      };
    case OPEN_SIGNUP_MODAL:
      return {
        ...state,
        shouldShowSignup: true
      };
    case CLOSE_SIGNUP_MODAL:
      return {
        ...state,
        shouldShowSignup: false
      };
    case OPEN_LOGIN_MODAL:
      return {
        ...state,
        shouldShowLogin: true
      };
    case CLOSE_LOGIN_MODAL:
      return {
        ...state,
        shouldShowLogin: false
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
        error: null
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        authenticated: false,
        authenticating: false,
        user: null,
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
        error: null
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        authenticated: false,
        authenticating: false,
        user: null,
        error: action.error
      };
    case LOGOUT:
      return {
        ...state,
        authenticated: false,
        user: null
      };
    default:
      return state;
  }
}

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const openSignupModal = () => (dispatch) => {
  dispatch({ type: OPEN_SIGNUP_MODAL });
};

export const closeSignupModal = () => (dispatch) => {
  dispatch({ type: CLOSE_SIGNUP_MODAL });
};

export const openLoginModal = () => (dispatch) => {
  dispatch({ type: OPEN_LOGIN_MODAL });
};

export const closeLoginModal = () => (dispatch) => {
  dispatch({ type: CLOSE_LOGIN_MODAL });
};

export const checkAuth = () => async (dispatch) => {
  const { client } = (__CLIENT__) ? require('../../../client') : require('../../../server');
  dispatch({ type: LOGIN_REQUEST });

  try {
    const { data: { currentUser } } = await client.query({
      query: gql`
      query {
        currentUser {
          id
          email
        }
      }
      `
    });
    if (!isEmpty(currentUser)) {
      dispatch({ type: LOGIN_SUCCESS, user: currentUser });
    } else {
      localStorage.removeItem(authTokenName);
      dispatch({ type: LOGIN_FAILURE });
    }
  } catch (err) {
    localStorage.removeItem(authTokenName);
    dispatch({ type: LOGIN_FAILURE });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem(authTokenName);
  dispatch({ type: LOGOUT });
};

export const signupUser = (name, email, password) => async (dispatch) => {
  const { client } = (__CLIENT__) ? require('../../../client') : require('../../../server');
  dispatch({ type: SIGNUP_REQUEST });

  try {
    const { data: { createUser }, errors } = await client.mutate({
      mutation: gql`
        mutation User($name: String!, $email: Email!, $password: Password!) {
          createUser(name: $name, email: $email, password: $password) {
            user {
              id
              name
              email
            }
            authToken
          }
        }
      `,
      variables: {
        name,
        email,
        password
      }
    });

    if (!isEmpty(errors)) {
      localStorage.removeItem(authTokenName);
      dispatch({ type: SIGNUP_FAILURE, error: head(errors).message });
    } else {
      const { user, authToken } = createUser;
      localStorage.setItem(authTokenName, authToken);
      dispatch({ type: SIGNUP_SUCCESS, user });
    }
  } catch (err) {
    localStorage.removeItem(authTokenName);
    dispatch({ type: SIGNUP_FAILURE, error: err });
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  const { client } = (__CLIENT__) ? require('../../../client') : require('../../../server');
  dispatch({ type: LOGIN_REQUEST });

  try {
    const { data: { loginUser: { user, authToken } } } = await client.query({
      query: gql`
        query User($email: Email!, $password: Password!) {
          loginUser(email: $email, password: $password) {
            user {
              id
              email
            }
            authToken
          }
        }
      `,
      variables: {
        email,
        password
      }
    });

    localStorage.setItem(authTokenName, authToken);
    dispatch({ type: LOGIN_SUCCESS, user });
  } catch (err) {
    localStorage.removeItem(authTokenName);
    dispatch({ type: LOGIN_FAILURE, error: head(err.graphQLErrors).message });
  }
};
