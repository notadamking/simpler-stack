import React, { Component, PropTypes } from 'react';
import { Button } from 'react-semantify';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'lightBlue !important',
    ':hover': {
      backgroundColor: 'blue'
    },
    ':active': {
      backgroundColor: 'purple'
    }
  }
});

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ clicked: !this.state.clicked });
  }

  render() {
    return (
      <div className="container">
        <Button className={css(styles.btn)} onClick={this.handleClick}>
          {this.state.clicked ? 'Untry Me...' : 'Try Me!'}
        </Button>
      </div>
    );
  }
}
