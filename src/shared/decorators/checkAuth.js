import React, { Component, PropTypes } from 'react';
import { connect } from 'react-apollo';
import { checkToken } from '../redux/modules/auth';

@connect()
export default () => ComposedComponent => class AuthenticatedComponent extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  render() {
    this.props.dispatch(checkToken());

    return (
      <ComposedComponent />
    );
  }
};
