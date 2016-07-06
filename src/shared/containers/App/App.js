import React, { Component, PropTypes } from 'react';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div className="app">
        <div className="app-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}
