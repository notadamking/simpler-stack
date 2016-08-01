import React, { Component, PropTypes } from 'react';
import { Menu, Item, Icon, Container, Label } from 'react-semantify';
import { isEmpty } from 'lodash';

import { Modal } from '../';
import { Login, Signup } from '../../containers';

export default class NavBar extends Component {
  static propTypes = {
    user: PropTypes.object,
    data: PropTypes.object,
    shouldShowLogin: PropTypes.bool.isRequired,
    shouldShowSignup: PropTypes.bool.isRequired,
    openLoginModal: PropTypes.func.isRequired,
    openSignupModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  };

  static defaultProps = {
    shouldShowLogin: false,
    shouldShowSignup: false,
    openLoginModal: () => false,
    openSignupModal: () => false,
    closeModal: () => false,
    logout: () => false,
  };

  render() {
    const { data, user, shouldShowLogin, shouldShowSignup,
      openLoginModal, openSignupModal, closeModal, logout } = this.props;

    return (
      <nav>
        <Menu className="top attached blue">
          <Item className="active" type="link">
            <Icon className="home" /> home
          </Item>
          <Item type="link">
            <Icon className="chat" /> chat
          </Item>
          {isEmpty(user) && (
            <div className="right menu">
              <Item type="link" onClick={openSignupModal}>
                <Icon className="checkmark box" /> sign up
              </Item>
              <Item type="link" onClick={openLoginModal}>
                <Icon className="sign in" /> sign in
              </Item>
            </div>
          )}
          {!isEmpty(user) && (
            <div className="right menu">
              <Item type="link">
                <Icon className="user" /> profile ({user.email})
              </Item>
              <Item type="link" onClick={logout}>
                <Icon className="sign out" /> sign out
              </Item>
            </div>
          )}
        </Menu>
        <Container className="centered grid">
          <Label className="blue large">
            <Icon className="users" /> {!isEmpty(data) && !isEmpty(data.users) && data.users.length}
          </Label>
        </Container>
        {shouldShowLogin && (
          <Modal onHide={closeModal} classNames="small">
            <Login />
          </Modal>
        )}
        {shouldShowSignup && (
          <Modal onHide={closeModal} classNames="small">
            <Signup />
          </Modal>
        )}
      </nav>
    );
  }
}
