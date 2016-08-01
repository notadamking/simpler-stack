import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';

export default class Modal extends Component {
  static propTypes = {
    children: PropTypes.object,
    onHide: PropTypes.func,
    classNames: PropTypes.string
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  static defaultProps = {
    modalClasses: ''
  };

  componentDidMount() {
    this.modalTarget = document.createElement('div');
    this.modalTarget.className = `ui modal ${this.props.classNames}`;
    document.body.appendChild(this.modalTarget);
    this._render();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    $('.ui.modals').remove();
  }

  _render() {
    const { client } = (__CLIENT__) ? require('../../../client') : require('../../../server');

    ReactDOM.render(
      <ApolloProvider store={this.context.store} client={client}>
        <div>{this.props.children}</div>
      </ApolloProvider>,
      this.modalTarget
    );
    $('.ui.modal').modal({
      onHidden: () => {
        if (this.props.onHide) {
          this.props.onHide();
        } else {
          this.componentWillUnmount();
        }
      }
    }).modal('show');
  }

  render() {
    return <noscript />;
  }
}
