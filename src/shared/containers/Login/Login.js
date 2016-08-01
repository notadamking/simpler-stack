import React, { Component, PropTypes } from 'react';
import { connect } from 'react-apollo';

import { Modal, LoginForm } from '../../components';
import { closeModal, loginUser } from '../../redux/modules/auth';

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
    authenticated: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
  };

  onFormSubmit({ email, password }) {
    this.props.dispatch(loginUser(email, password));
  }

  render() {
    const { submitError, authenticated } = this.props;
    return (
      <Modal onHide={closeModal} modalClasses="small">
        <LoginForm onFormSubmit={this.onFormSubmit} submitError={submitError} authenticated={authenticated} />
      </Modal>
    );
  }
}
