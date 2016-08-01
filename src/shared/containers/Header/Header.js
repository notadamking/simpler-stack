import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-apollo';
import gql from 'graphql-tag';

import checkAuth from '../../decorators/checkAuth';
import { getUsersQuery } from '../../utils/queries';
import { NavBar } from '../../components';
import * as actions from '../../redux/modules/auth';

@checkAuth()
@connect({
  mapQueriesToProps: ({ ownProps, state }) => ({
    data: getUsersQuery
  }),
  mapStateToProps: (state) => {
    return {
      shouldShowLogin: state.auth.shouldShowLogin,
      shouldShowSignup: state.auth.shouldShowSignup,
      user: state.auth.user
    };
  },
  mapDispatchToProps: actions
})
export default class Header extends Component {
  static propTypes = {
    user: PropTypes.object,
    data: PropTypes.object,
    shouldShowLogin: PropTypes.bool,
    shouldShowSignup: PropTypes.bool,
    openLoginModal: PropTypes.func.isRequired,
    openSignupModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  };

  render() {
    const { openLoginModal, openSignupModal, closeModal, logout, data, user,
      shouldShowLogin, shouldShowSignup } = this.props;
    return (
      <NavBar openLoginModal={openLoginModal} openSignupModal={openSignupModal} closeModal={closeModal}
        logout={logout} user={user} data={data} shouldShowLogin={shouldShowLogin} shouldShowSignup={shouldShowSignup} />
    );
  }
}
