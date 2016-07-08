import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Menu, Item, Icon, Container, Card, Label } from 'react-semantify';
import { asyncConnect } from 'redux-connect';
import { loadAll as loadAllUsers } from '../../redux/modules/users';

@asyncConnect([{
  key: 'users',
  promise: ({ store: { dispatch }}) => {
    return dispatch(loadAllUsers());
  }
}])
class App extends Component {
  static propTypes = {
    users: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.string
  };

  render() {
    return (
      <nav>
        <Menu className="top attached blue">
          <Item className="active" type="link">
            <Icon className="home" /> home
          </Item>
          <Item type="link">
            <Icon className="chat" /> chat
          </Item>
          <div className="right menu">
            <Item type="link">
              <Icon className="checkmark box" /> sign up
            </Item>
            <Item type="link">
              <Icon className="sign in" /> sign in
            </Item>
          </div>
        </Menu>
        <Container className="centered grid">
          <Label className="blue large">
            <Icon className="users" /> {{users}}
          </Label>
        </Container>
      </nav>
    );
  }
}
