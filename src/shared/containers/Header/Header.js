import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Menu, Item, Icon, Container, Label } from 'react-semantify';
import { connect } from 'react-apollo';
import { isEmpty } from 'lodash';
import gql from 'graphql-tag';

import { openSignupModal, openLoginModal, closeSignupModal,
          closeLoginModal, logout, clearErrors } from '../../redux/modules/auth';
import checkAuth from '../../decorators/checkAuth';
import { Modal } from '../../components';
import { LoginForm, SignupForm } from '../';

const mapQueriesToProps = ({ ownProps, state }) => ({
  data: {
    query: gql`
    query {
      users {
        id,
        email
      }
    }
    `
  }
});

const mapStateToProps = (state) => {
  return {
    shouldShowLogin: state.auth.shouldShowLogin,
    shouldShowSignup: state.auth.shouldShowSignup,
    user: state.auth.user
  };
};

@checkAuth()
@connect({
  mapQueriesToProps,
  mapStateToProps
})
export default class Header extends Component {
  static propTypes = {
    user: PropTypes.object,
    data: PropTypes.object,
    shouldShowLogin: PropTypes.bool,
    shouldShowSignup: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  onCloseSignupModal() {
    this.props.dispatch(closeSignupModal());
    this.closeModal();
  }

  onCloseLoginModal() {
    this.props.dispatch(closeLoginModal());
    this.closeModal();
  }

  onClickLogout() {
    this.props.dispatch(logout());
  }

  onClickSignup() {
    this.props.dispatch(openSignupModal());
  }

  onClickLogin() {
    this.props.dispatch(openLoginModal());
  }

  closeModal() {
    this.props.dispatch(clearErrors());
    $('.dimmed').removeClass('dimmed');
  }

  render() {
    const { dispatch, data, user, shouldShowLogin, shouldShowSignup } = this.props;

    const authNav = (!isEmpty(user)) ? (
      <div className="right menu">
        <Item type="link">
          <Icon className="user" /> profile ({user.email})
        </Item>
        <Item type="link" onClick={this.onClickLogout.bind(this)}>
          <Icon className="sign out" /> sign out
        </Item>
      </div>
    ) : (
      <div className="right menu">
        <Item type="link" onClick={this.onClickSignup.bind(this)}>
          <Icon className="checkmark box" /> sign up
        </Item>
        <Item type="link" onClick={this.onClickLogin.bind(this)}>
          <Icon className="sign in" /> sign in
        </Item>
      </div>
    );

    return (
      <nav>
        <Menu className="top attached blue">
          <Item className="active" type="link">
            <Icon className="home" /> home
          </Item>
          <Item type="link">
            <Icon className="chat" /> chat
          </Item>
          {authNav}
        </Menu>
        <Container className="centered grid">
          <Label className="blue large">
            <Icon className="users" /> {!isEmpty(data.users) && data.users.length}
          </Label>
        </Container>
        {shouldShowLogin &&
          <Modal onHide={this.onCloseLoginModal.bind(this)} modalClasses="small">
            <LoginForm onSuccess={this.onCloseLoginModal.bind(this)}/>
          </Modal>
        }
        {shouldShowSignup &&
          <Modal onHide={this.onCloseSignupModal.bind(this)} modalClasses="small">
            <SignupForm onSuccess={this.onCloseSignupModal.bind(this)}/>
          </Modal>
        }
      </nav>
    );
  }
}
