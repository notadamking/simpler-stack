import { Post, User, Comment } from '../../models';

export const postTypes = `
  type Post {
    id: String!
    title: String!
    description: String!
    author: String!
    createdAt: Date!
  }
`;

export const postQueries = `
  post(id: String!): Post
  allPosts: [Post]
  postsByUser(id: String!): [Post]
`;

export const postMutations = `
  createPost(title: String!, description: String!, author: String!): Post
`;

export const postResolvers = {
  Query: {
    post: async (_, { id }) => await Post.get(id).run(),
    allPosts: async () => await Post.run(),
    postsByUser: async (_, { id }) => await Post.filter({ authorId: id }).run()
  },
  Mutation: {
    createPost: async (_, { title, description, author }) => {
      if (!title) {
        throw new Error('Cannot create a post without a title');
      }
      if (!description) {
        throw new Error('Cannot create a post without a description');
      }
      if (!author) {
        throw new Error('Cannot create a post without an author id');
      }
      const post = new Post({ title, description, author });
      await post.saveAll();
      return post;
    }
  }
};
