import React, { Component, PropTypes } from 'react';
import { Menu, Item, Icon, Container, Card, Label } from 'react-semantify';
import { connect } from 'react-redux';
import * as actions from '../../redux/modules/users';

@connect(
  state => ({
    users: state.users.data,
    error: state.users.error,
    fetching: state.users.fetching,
    fetched: state.users.fetched
  }),
  actions
)
export default class Header extends Component {
  static propTypes = {
    users: PropTypes.object,
    fetching: PropTypes.bool,
    fetched: PropTypes.bool,
    error: PropTypes.object,
    fetchUsers: PropTypes.func
  };

  componentWillMount() {
    this.props.fetchUsers();
  }

  render() {
    const users = this.props.users;
    console.log(users);
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
            <Icon className="users" /> 0
          </Label>
        </Container>
      </nav>
    );
  }
}
