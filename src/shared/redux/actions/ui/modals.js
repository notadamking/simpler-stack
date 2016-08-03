export const OPEN_LOGIN_MODAL = 'AUTH/OPEN_LOGIN_MODAL';
export const openLoginModal = () => {
  return {
    type: OPEN_LOGIN_MODAL
  };
};

export const OPEN_SIGNUP_MODAL = 'AUTH/OPEN_SIGNUP_MODAL';
export const openSignupModal = () => {
  return {
    type: OPEN_SIGNUP_MODAL
  };
};

export const CLOSE_MODALS = 'AUTH/CLOSE_MODALS';
export const closeModals = () => {
  return {
    type: CLOSE_MODALS
  };
};
