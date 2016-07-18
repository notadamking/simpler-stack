import React, { Component, PropTypes } from 'react';
import { Form, Field, Segment, Label, Icon, Input, Button, Message } from 'react-semantify';
import { connect } from 'react-apollo';
import validatedForm from '../../decorators/validatedForm';
import classNames from 'classnames';

import { LoginFormSchema } from './validate';

@validatedForm({
  form: 'login',
  fields: [ 'email', 'password' ],
  schema: LoginFormSchema
})
export default class LoginForm extends Component {
  static propTypes = {
    submitting: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    fields: PropTypes.object
  };

// TODO: dismissableMessage Component

  render() {
    const { handleSubmit, submitting, fields: { email, password } } = this.props;

    return (
      <Form className="large" onSubmit={handleSubmit}>
        <Segment className="stacked">
          <Field className={classNames({
            error: email.touched && email.error
          })}>
            <Input className="icon">
              <input name="email" placeholder="email" type="email" {...email}/>
              <Icon className="mail"/>
            </Input>
            {email.touched && email.error && <Message className="visible error"><Icon className="close"/>{email.error}</Message>}
          </Field>
          <Field className={classNames({
            error: password.touched && password.error
          })}>
            <Input className="icon">
              <input name="password" placeholder="password" type="password" {...password}/>
              <Icon className="lock"/>
            </Input>
          </Field>
          {password.touched && password.error && <Message className="visible error"><Icon className="close"/>{password.error}</Message>}
          <Button className="fluid large teal submit" disabled={submitting} onSubmit={handleSubmit}>
            Login
          </Button>
        </Segment>
      </Form>
    );
  }
}
