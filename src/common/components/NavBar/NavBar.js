import React, { Component, PropTypes } from 'react';
import { Menu, Item, Icon, Container, Label } from 'react-semantify';
import { Link } from 'react-router';

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
    closeModals: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  };

  static defaultProps = {
    shouldShowLogin: false,
    shouldShowSignup: false,
    openLoginModal: () => false,
    openSignupModal: () => false,
    closeModals: () => false,
    logout: () => false,
  };

  render() {
    const { data, user, shouldShowLogin, shouldShowSignup,
      openLoginModal, openSignupModal, closeModals, logout } = this.props;

    return (
      <nav>
        <Menu className="top attached blue">
          <Link to="/" className="active item">
            <Icon className="home" /> home
          </Link>
          <Link to="/chat" className="item">
            <Icon className="chat" /> chat
          </Link>
          {!user ? (
            <div className="right menu">
              <Item type="link" onClick={openSignupModal}>
                <Icon className="checkmark box" /> sign up
              </Item>
              <Item type="link" onClick={openLoginModal}>
                <Icon className="sign in" /> sign in
              </Item>
            </div>
          ) : (
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
        {shouldShowLogin && (
          <Modal onHide={closeModals} classNames="small">
            <Login />
          </Modal>
        )}
        {shouldShowSignup && (
          <Modal onHide={closeModals} classNames="small">
            <Signup />
          </Modal>
        )}
      </nav>
    );
  }
}
