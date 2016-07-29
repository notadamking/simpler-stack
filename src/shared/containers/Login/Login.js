import React, { Component, PropTypes } from 'react';
import { connect } from 'react-apollo';

import { Modal, LoginForm } from '../../components';
import { closeModal } from '../../redux/modules/auth';

@connect({
  mapStateToProps: (state) => {
    return {
      submitError: state.auth.error,
      authenticated: state.auth.authenticated
    };
  }
})
export default class Login extends Component {
  static propTypes = {
    submitError: PropTypes.string,
    authenticated: PropTypes.bool
  };

  render() {
    const { submitError, authenticated } = this.props;
    return (
      <Modal onHide={closeModal} modalClasses="small">
        <LoginForm submitError={submitError} authenticated={authenticated} />
      </Modal>
    );
  }
}
