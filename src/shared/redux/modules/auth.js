import { authTokenName } from '../../../config';

export const LOGIN_REQUEST = 'auth/login_request';
export const LOGIN_SUCCESS = 'auth/login_success';
export const LOGIN_FAILURE = 'auth/login_failure';

const initialState = {
  authenticated: false,
  authenticating: false,
  user: {},
  error: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
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
        users: null,
        error: action.error
      };
    default:
      return state;
  }
}

export const loginUser = (dispatch, variables) => {
  dispatch({ type: LOGIN_REQUEST });
  return new Promise(async (resolve, reject) => {
    const { error, data } = await Promise.resolve({ filler: 'data' });
    if (error) {
      localStorage.removeItem(authTokenName);
      dispatch({ type: LOGIN_FAILURE, error });
      reject(error);
    } else {
      const { user, authToken } = data;
      localStorage.setItem(authTokenName, authToken);
      dispatch({ type: LOGIN_SUCCESS, user });
      resolve();
    }
  });
};
