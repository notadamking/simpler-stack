import React, { Component, PropTypes } from 'react';
import { connect } from 'react-apollo';

import { getCommentsForPostQuery } from '../../utils/queries';
import { Comment } from '../../components';

@connect({
  mapQueriesToProps: ({ ownProps, state }) => ({
    data: getCommentsForPostQuery({ postId: ownProps.postId })
  })
})
export default class Comments extends Component {
  static propTypes = {
    data: PropTypes.object
  };

  render() {
    const { data: { commentsForPost } } = this.props;
    return (
      <div>
        {commentsForPost ? commentsForPost.map((comment, i) => {
          const { author, description, createdAt } = comment;
          return <Comment key={i} author={author} description={description} createdAt={createdAt} />;
        }) : <noscript />}
      </div>
    );
  }
}
