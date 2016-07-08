import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Menu, Item, Icon, Container, Card, Label } from 'react-semantify';
import { Header } from '../';

const FiraSansFont = {
  fontFamily: 'FiraSans',
  fontStyle: 'normal',
  fontWeight: 'normal',
  src: 'url("fonts/FiraSans-Regular.ttf") format("ttf")'
};

const styles = StyleSheet.create({
  app: {
    fontFamily: FiraSansFont
  },
  content: {
    paddingTop: '40px'
  }
});

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div className={css(styles.app)}>
        <Header />
        <div className={css(styles.content)}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
