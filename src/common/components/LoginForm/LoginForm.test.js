import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';

import LoginForm from './LoginForm';

describe('Component::LoginForm', () => {
  it('contains a form element', () => {
    expect(shallow(<LoginForm />).find('form')).to.have.length(1);
  });

  it('contains email and password input elements', () => {
    expect(shallow(<LoginForm />).find('input')).to.have.length(2);
    expect(shallow(<LoginForm />).find('[name="email"][type="email"]')).to.have.length(1);
    expect(shallow(<LoginForm />).find('[name="password"][type="password"]')).to.have.length(1);
  });

  it('contains submit button', () => {
    expect(shallow(<LoginForm />).find('button[type="submit"]')).to.have.length(1);
  });

  it('shows error messages on email field error', () => {
    expect(mount(<LoginForm />).find('.visible.error.message')).to.have.length(0);
    expect(mount(<LoginForm />).setProps({
      fields: {
        email: {
          touched: true,
          error: 'An error'
        },
        password: {}
      }
    }).find('.visible.error.message')).to.have.length(1);
  });

  it('shows error messages on password field error', () => {
    expect(mount(<LoginForm />).find('.visible.error.message')).to.have.length(0);
    expect(mount(<LoginForm />).setProps({
      fields: {
        email: {},
        password: {
          touched: true,
          error: 'An error'
        }
      }
    }).find('.visible.error.message')).to.have.length(1);
  });
});
