import { Comment, Post } from '../../models';

export const commentTypes = `
  type Comment {
    id: String!
    description: String!
    author: String!
    createdAt: Date!
  }
`;

export const commentQueries = `
  comment(id: String!): Comment
  commentsForPost(id: String!): [Comment]
  commentsByUser(id: String!): [Comment]
`;

export const commentMutations = `
  addCommentToPost(postId: String!, description: String!, author: String!): Post
`;

export const commentResolvers = {
  Query: {
    comment: async (_, { id }) => await Comment.get(id).run(),
    commentsForPost: async (_, { id }) => await Comment.filter({ postId: id }).run(),
    commentsByUser: async (_, { id }) => await Comment.filter({ authorId: id }).run()
  },
  Mutation: {
    addCommentToPost: async (_, { postId, description, author }) => {
      if (!description) {
        throw new Error('Cannot create a comment without a description');
      }
      if (!author) {
        throw new Error('Cannot create a comment without an author id');
      }
      const post = await Post.get(postId).run();
      const comment = new Comment({ description, author, post });
      await comment.saveAll({ post: true });
      console.log(comment);
      return comment;
    }
  }
};
