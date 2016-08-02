import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';

import NavBar from './NavBar';
import { Modal } from '../';

describe('Component::NavBar', () => {
  it('contains a nav element', () => {
    expect(shallow(<NavBar />).find('nav')).to.have.length(1);
  });

  it('only shows sign up / sign in if no user is logged in', () => {
    expect(mount(<NavBar />)).to.contain.text('sign up');
    expect(mount(<NavBar user={{ empty: false }} />)).to.not.contain.text('sign up');
    expect(mount(<NavBar />)).to.contain.text('sign in');
    expect(mount(<NavBar user={{ empty: false }} />)).to.not.contain.text('sign in');
  });

  it('only shows sign out if user is logged in', () => {
    expect(mount(<NavBar />)).to.not.contain.text('sign out');
    expect(mount(<NavBar user={{ empty: false }} />)).to.contain.text('sign out');
  });
});
