import React, { Component, PropTypes } from 'react';
import { connect } from 'react-apollo';

import checkAuth from '../../decorators/checkAuth';
import { getPostQuery } from '../../utils/queries';
import { Post } from '../../components';

@connect({
  mapQueriesToProps: ({ ownProps, state }) => ({
    data: getPostQuery({ id: ownProps.postId })
  }),
  mapStateToProps: (state) => {
    return {
      user: state.auth.user
    };
  },
})
export default class PostContainer extends Component {
  static propTypes = {
    postId: PropTypes.string.isRequired,
    data: PropTypes.object,
    user: PropTypes.object
  };

  render() {
    const { data: { post }, user } = this.props;
    if (post) {
      return (
        <Post author={post.author} title={post.title} description={post.description}
          createdAt={post.createdAt} showCommentBox={!!user} />
      );
    }
    return <noscript />;
  }
}
