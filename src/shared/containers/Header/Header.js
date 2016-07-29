import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-apollo';
import gql from 'graphql-tag';

import checkAuth from '../../decorators/checkAuth';
import { NavBar } from '../../components';

const mapQueriesToProps = ({ ownProps, state }) => ({
  data: {
    query: gql`
    query {
      users {
        id,
        email
      }
    }
    `
  }
});

const mapStateToProps = (state) => {
  return {
    shouldShowLogin: state.auth.shouldShowLogin,
    shouldShowSignup: state.auth.shouldShowSignup,
    user: state.auth.user
  };
};

@checkAuth()
@connect({
  mapQueriesToProps,
  mapStateToProps
})
export default class Header extends Component {
  static propTypes = {
    user: PropTypes.object,
    data: PropTypes.object,
    shouldShowLogin: PropTypes.bool,
    shouldShowSignup: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
  };

  render() {
    const { data, user, shouldShowLogin, shouldShowSignup } = this.props;
    return (
      <NavBar user={user} data={data} shouldShowLogin={shouldShowLogin} shouldShowSignup={shouldShowSignup} />
    );
  }
}
