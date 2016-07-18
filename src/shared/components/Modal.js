import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { Modal as SemanticModal } from 'react-semantify';

export default class Modal extends Component {
  static propTypes = {
    shouldShow: PropTypes.string,
    children: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  static defaultProps = {
    shouldShow: 'true'
  };

  componentDidMount() {
    this.modalTarget = document.createElement('div');
    this.modalTarget.className = 'ui modal';
    document.body.appendChild(this.modalTarget);
    this._render();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    document.body.removeChild(this.modalTarget);
  }

  _render() {
    let client;
    if (__CLIENT__) {
      client = require('../../client').client;
    } else {
      client = require('../../server').client;
    }
    ReactDOM.render(
      <ApolloProvider store={this.context.store} client={client}>
        <div>{this.props.children}</div>
      </ApolloProvider>,
      this.modalTarget
    );
    $('.ui.modal').modal('show');
  }

  render() {
    return <noscript />;
  }
}
