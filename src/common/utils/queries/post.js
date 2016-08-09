import gql from 'graphql-tag';

export const getPostQuery = ({ id }) => ({
  query: gql`
    query Post($id: String!) {
      post(id: $id) {
        id
        author
        title
        description
        createdAt
      }
    }
  `,
  variables: {
    id
  }
});

export const getCommentsForPostQuery = ({ postId }) => ({
  query: gql`
    query CommentList($postId: String!) {
      commentsForPost(id: $postId) {
        id
        author
        description
        createdAt
      }
    }
  `,
  variables: {
    postId
  }
});
