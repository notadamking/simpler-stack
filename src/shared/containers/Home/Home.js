import React, { Component } from 'react';
import { Button } from 'react-semantify';

export default class Home extends Component {

  handleClick() {
    console.log('Button worked!');
  }

  render() {
    return (
      <div className="container">
        <Button color="blue" onClick={this.handleClick}>
          Blue Button
        </Button>
      </div>
    );
  }
}
