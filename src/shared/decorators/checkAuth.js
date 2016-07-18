import React, { Component, PropTypes } from 'react';
import { connect } from 'react-apollo';
import gql from 'graphql-tag';
import { authTokenName } from '../../config';

const mapQueriesToProps = ({ ownProps, state }) => ({
  data: {
    query: gql`
    query {
      currentUser {
        id
        email
      }
    }
    `
  }
});

@connect({
  mapQueriesToProps
})
export default () => ComposedComponent => class AuthenticatedComponent extends Component {
  static propTypes = {
    data: PropTypes.object
  };

  render() {
    return (
      <ComposedComponent {...this.props}/>
    );
  }
};
