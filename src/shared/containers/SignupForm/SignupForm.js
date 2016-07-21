import React, { Component, PropTypes } from 'react';
import { Header, Divider, Form, Field, Segment, Icon,
  Input, Button, Message } from 'react-semantify';
import { connect } from 'react-apollo';
import classNames from 'classnames';

import validateForm from '../../decorators/validateForm';
import schema from './validate';
import { signupUser, clearErrors } from '../../redux/modules/auth';

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
export default class LoginForm extends Component {
  static propTypes = {
    submitting: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitError: PropTypes.string,
    authenticated: PropTypes.bool,
    fields: PropTypes.object,
    onSuccess: PropTypes.func
  };

  async onSubmit() {
    const { dispatch, onSuccess, fields: { name, email, password } } = this.props;
    await dispatch(signupUser(name.value, email.value, password.value));

    // this.props.authenticated because dispatch changes state
    if (this.props.authenticated && onSuccess) {
      onSuccess();
    }
  }

  render() {
    const { submitError, authenticated, handleSubmit, submitting,
      fields: { name, email, password } } = this.props;

    return (
      <Segment className="stacked">
        <Header>
          Sign up
        </Header>
        <Divider />
        <Message className={classNames('error', { hidden: !submitError })}>
          <strong>Sign up failed.</strong> {submitError}
        </Message>
        <Form className="padded large" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field className={classNames({
            error: name.touched && name.error
          })}>
            <Input className="icon">
              <input name="name" placeholder="name" type="name" {...name}/>
              <Icon className="talk"/>
            </Input>
          </Field>
          <Field className={classNames({
            error: email.touched && email.error
          })}>
            <Input className="icon">
              <input name="email" placeholder="email" type="email" {...email}/>
              <Icon className="mail"/>
            </Input>
          </Field>
          <Field className={classNames({
            error: password.touched && password.error
          })}>
            <Input className="icon">
              <input name="password" placeholder="password" type="password" {...password}/>
              <Icon className="lock"/>
            </Input>
          </Field>
          <Button className="fluid large teal submit" disabled={submitting} onClick={handleSubmit(this.onSubmit.bind(this))}>
            Login
          </Button>
          <Message className={classNames('error', {
            visible: (name.touched && name.error) || (email.touched && email.error) || (password.touched && password.error)
          })}>
            <div className="header">
              Please fix errors before submitting
            </div>
            <ul className="list">
              {name.touched && name.error && <li>{name.error}</li>}
              {email.touched && email.error && <li>{email.error}</li>}
              {password.touched && password.error && <li>{password.error}</li>}
            </ul>
          </Message>
        </Form>
      </Segment>
    );
  }
}
