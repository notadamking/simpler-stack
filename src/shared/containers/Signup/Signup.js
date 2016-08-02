import React, { Component, PropTypes } from 'react';
import { connect } from 'react-apollo';

import { SignupForm } from '../../components';
import { signupUser } from '../../redux/actions/auth';
import validateForm from '../../decorators/validateForm';
import schema from './validate';

@connect({
  mapStateToProps: (state) => {
    return {
      submitError: state.auth.error,
      authenticated: state.auth.authenticated
    };
  }
})
@validateForm({
  form: 'signup',
  fields: [ 'name', 'email', 'password' ],
  schema
})
export default class Signup extends Component {
  static propTypes = {
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitError: PropTypes.string,
    authenticated: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired
  };

  static contextTypes = {
    client: PropTypes.object.isRequired
  };

  onFormSubmit({ name, email, password }) {
    this.props.dispatch(signupUser({ client: this.context.client, name, email, password }));
  }

  render() {
    const { submitError, authenticated, fields, submitting, handleSubmit } = this.props;
    return (
      <SignupForm fields={fields} submitError={submitError} authenticated={authenticated}
        submitting={submitting} handleSubmit={handleSubmit(this.onFormSubmit.bind(this))} />
    );
  }
}
