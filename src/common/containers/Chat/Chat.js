import React, { Component, PropTypes } from 'react';
import { Menu, Item, Icon } from 'react-semantify';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="ui container">
        <Menu className="blue">
            <Item className="active" type="link">
              <Icon className="home" /> home
            </Item>
            <Item type="link">
              <Icon className="chat" /> chat
            </Item>
            <Item className="floated right" type="link">
              <Icon className="sign in" /> sign in
            </Item>
            <Item className="floated right" type="link">
              <Icon className="checkmark box" /> sign up
            </Item>
        </Menu>
      </div>
    );
  }
}
