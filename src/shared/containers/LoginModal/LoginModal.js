import React, { Component, PropTypes } from 'react';
import { Modal, Header, Form, Fields, Field, Label, Icon, Input, Button } from 'react-semantify';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import classNames from 'classnames';

import { loginModalSchema } from './validate';

// TODO decorator to redirect on authed/!authed
@connect(
  state => ({
    authenticated: state.auth.authenticated,
    authenticating: state.auth.authenticating,
    user: state.auth.user,
    error: state.auth.error
  })
)
@reduxForm({
  form: 'login',
  fields: [ 'email', 'password' ],
  validate: values => loginModalSchema.validate(values)
})
export default class LoginModal extends Component {
  static propTypes = {
    show: PropTypes.bool,
    authenticated: PropTypes.bool,
    authenticating: PropTypes.bool,
    submitting: PropTypes.bool,
    user: PropTypes.object,
    error: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    fields: PropTypes.object
  };

  handleFormSubmit({ email, password }) {
    // hi
  }

  render() {
    const { show, handleSubmit, submitting, fields: { email, password } } = this.props;

    return (
      <Modal init={show}>
        <Form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Fields className="two">
            <Field name="email" className={classNames({
              error: email.touched && email.error
            })}>
            <Label>Email</Label>
            <Input className="icon">
              <input placeholder="email" type="email" required/>
              <Icon className="envelope"/>
            </Input>
            </Field>
            <Field name="password" className={classNames({
              error: password.touched && password.error
            })}>
              <Label>Password</Label>
              <Input className="icon">
                <input placeholder="password" type="password" required/>
                <Icon className="lock"/>
              </Input>
            </Field>
          </Fields>
          <Button className="orange" disabled={submitting}>
            Login
          </Button>
        </Form>
      </Modal>
    );
  }
}
