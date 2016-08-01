import React, { Component, PropTypes } from 'react';
import { connect } from 'react-apollo';

import validateForm from '../../decorators/validateForm';
import schema from './validate';
import { LoginForm } from '../../components';
import { loginUser } from '../../redux/modules/auth';

@connect({
  mapStateToProps: (state) => {
    return {
      submitError: state.auth.error,
      authenticated: state.auth.authenticated
    };
  }
})
@validateForm({
  form: 'login',
  fields: [ 'email', 'password' ],
  schema
})
export default class Login extends Component {
  static propTypes = {
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitError: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired
  };

  onFormSubmit({ email, password }) {
    this.props.dispatch(loginUser(email, password));
  }

  render() {
    const { submitError, authenticated, fields, submitting, handleSubmit } = this.props;
    return (
      <LoginForm fields={fields} submitError={submitError} authenticated={authenticated}
        submitting={submitting} handleSubmit={handleSubmit(this.onFormSubmit.bind(this))} />
    );
  }
}
