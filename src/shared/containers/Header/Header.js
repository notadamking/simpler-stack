import React, { Component, PropTypes } from 'react';
import { Menu, Item, Icon, Container, Card, Label } from 'react-semantify';
import { connect } from 'react-redux';
import { fetchUsers } from '../../redux/modules/users';
import { LoginModal } from '../';

@connect(
  state => ({
    users: state.users.users,
    error: state.users.error,
    fetching: state.users.fetching,
    fetched: state.users.fetched
  })
)
export default class Header extends Component {
  static propTypes = {
    users: PropTypes.array,
    fetching: PropTypes.bool,
    fetched: PropTypes.bool,
    error: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    const { dispatch } = props;
    dispatch(fetchUsers());
  }

  render() {
    const users = this.props.users;
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
            <Icon className="users" /> {users.length}
          </Label>
        </Container>
        <LoginModal show="true" />
      </nav>
    );
  }
}
