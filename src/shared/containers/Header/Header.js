import React, { Component, PropTypes } from 'react';
import { Menu, Item, Icon, Container, Card, Label } from 'react-semantify';
import { connect } from 'react-apollo';
import gql from 'graphql-tag';
import { isEmpty } from 'lodash';

import checkAuth from '../../decorators/checkAuth';
import { Modal } from '../../components';
import { LoginForm } from '../';

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

@checkAuth()
@connect({
  mapQueriesToProps
})
export default class Header extends Component {
  static propTypes = {
    data: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const { data } = this.props;
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
            <Icon className="users" /> {!isEmpty(data.users) && data.users.length}
          </Label>
        </Container>
        <Modal>
          <LoginForm />
        </Modal>
      </nav>
    );
  }
}
