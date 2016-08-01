import React, { Component, PropTypes } from 'react';
import { connect } from 'react-apollo';

import { Modal, SignupForm } from '../../components';
import { closeModal, signupUser } from '../../redux/modules/auth';

@connect({
  mapStateToProps: (state) => {
    return {
      submitError: state.auth.error,
      authenticated: state.auth.authenticated
    };
  }
})
export default class Signup extends Component {
  static propTypes = {
    submitError: PropTypes.string,
    authenticated: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
  };

  onFormSubmit({ name, email, password }) {
    this.props.dispatch(signupUser(name, email, password));
  }

  render() {
    const { submitError, authenticated } = this.props;
    return (
      <Modal onHide={closeModal} modalClasses="small">
        <SignupForm onFormSubmit={this.onFormSubmit} submitError={submitError} authenticated={authenticated} />
      </Modal>
    );
  }
}
