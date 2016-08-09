import React, { Component, PropTypes } from 'react';
import { connect } from 'react-apollo';
import { checkToken } from '../redux/actions/auth';

@connect()
export default () => ComposedComponent => class AuthenticatedComponent extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  static contextTypes = {
    client: PropTypes.object.isRequired
  };

  render() {
    this.props.dispatch(checkToken({ client: this.context.client }));

    return (
      <ComposedComponent />
    );
  }
};
