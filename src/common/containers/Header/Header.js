import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-apollo';
import gql from 'graphql-tag';

import checkAuth from '../../decorators/checkAuth';
import { getUsersQuery } from '../../utils/queries';
import { NavBar } from '../../components';
import { logout } from '../../redux/actions/auth';
import * as modalActions from '../../redux/actions/ui/modals';

@checkAuth()
@connect({
  mapStateToProps: (state) => {
    return {
      shouldShowLogin: state.ui.modals.shouldShowLogin,
      shouldShowSignup: state.ui.modals.shouldShowSignup,
      user: state.auth.user
    };
  },
  mapDispatchToProps: { ...modalActions, logout }
})
export default class Header extends Component {
  static propTypes = {
    user: PropTypes.object,
    shouldShowLogin: PropTypes.bool,
    shouldShowSignup: PropTypes.bool,
    openLoginModal: PropTypes.func.isRequired,
    openSignupModal: PropTypes.func.isRequired,
    closeModals: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  };

  render() {
    const { openLoginModal, openSignupModal, closeModals, shouldShowLogin, shouldShowSignup,
            user } = this.props;
    return (
      <NavBar openLoginModal={openLoginModal} openSignupModal={openSignupModal} closeModals={closeModals}
        logout={this.props.logout} user={user} shouldShowLogin={shouldShowLogin} shouldShowSignup={shouldShowSignup} />
    );
  }
}
