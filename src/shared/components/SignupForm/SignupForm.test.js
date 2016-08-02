import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';

import SignupForm from './SignupForm';

describe('Component::SignupForm', () => {
  it('contains a form element', () => {
    expect(shallow(<SignupForm />).find('form')).to.have.length(1);
  });

  it('contains name, email, and password input elements', () => {
    expect(shallow(<SignupForm />).find('input')).to.have.length(3);
    expect(shallow(<SignupForm />).find('[name="name"][type="text"]')).to.have.length(1);
    expect(shallow(<SignupForm />).find('[name="email"][type="email"]')).to.have.length(1);
    expect(shallow(<SignupForm />).find('[name="password"][type="password"]')).to.have.length(1);
  });

  it('contains submit button', () => {
    expect(shallow(<SignupForm />).find('button[type="submit"]')).to.have.length(1);
  });

  it('shows error messages on name field error', () => {
    expect(mount(<SignupForm />).find('.visible.error.message')).to.have.length(0);
    expect(mount(<SignupForm />).setProps({
      fields: {
        name: {
          touched: true,
          error: 'An error'
        },
        email: {},
        password: {}
      }
    }).find('.visible.error.message')).to.have.length(1);
  });

  it('shows error messages on email field error', () => {
    expect(mount(<SignupForm />).find('.visible.error.message')).to.have.length(0);
    expect(mount(<SignupForm />).setProps({
      fields: {
        name: {},
        email: {
          touched: true,
          error: 'An error'
        },
        password: {}
      }
    }).find('.visible.error.message')).to.have.length(1);
  });

  it('shows error messages on password field error', () => {
    expect(mount(<SignupForm />).find('.visible.error.message')).to.have.length(0);
    expect(mount(<SignupForm />).setProps({
      fields: {
        name: {},
        email: {},
        password: {
          touched: true,
          error: 'An error'
        }
      }
    }).find('.visible.error.message')).to.have.length(1);
  });
});
