export const CLEAR_AUTH_ERRORS = 'ui/forms/CLEAR_AUTH_ERRORS';
export const clearErrors = () => {
  return {
    type: CLEAR_AUTH_ERRORS
  };
};

export const LOGIN_SUBMIT_ERROR = 'ui/forms/LOGIN_SUBMIT_ERROR';
export const loginError = ({ error }) => {
  return {
    type: LOGIN_SUBMIT_ERROR,
    payload: {
      error: error.message
    }
  };
};

export const SIGNUP_SUBMIT_ERROR = 'ui/forms/SIGNUP_SUBMIT_ERROR';
export const signupError = ({ error }) => {
  return {
    type: SIGNUP_SUBMIT_ERROR,
    payload: {
      error: error.message
    }
  };
};
