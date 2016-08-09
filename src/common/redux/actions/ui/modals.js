export const OPEN_LOGIN_MODAL = 'ui/modals/OPEN_LOGIN_MODAL';
export const openLoginModal = () => {
  return {
    type: OPEN_LOGIN_MODAL
  };
};

export const OPEN_SIGNUP_MODAL = 'ui/modals/OPEN_SIGNUP_MODAL';
export const openSignupModal = () => {
  return {
    type: OPEN_SIGNUP_MODAL
  };
};

export const CLOSE_MODALS = 'ui/modals/CLOSE_MODALS';
export const closeModals = () => {
  return {
    type: CLOSE_MODALS
  };
};
