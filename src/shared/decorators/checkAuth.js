import React, { Component, PropTypes } from 'react';
import { connect } from 'react-apollo';
import { isEmpty } from 'lodash';
import gql from 'graphql-tag';
import { authTokenName } from '../../config';

import { checkAuth } from '../redux/modules/auth';

@connect()
export default () => ComposedComponent => class AuthenticatedComponent extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  render() {
    this.props.dispatch(checkAuth());

    return (
      <ComposedComponent {...this.props}/>
    );
  }
};
