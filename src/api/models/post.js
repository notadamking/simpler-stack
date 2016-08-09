import thinky from '../thinky';
import Comment from './comment';

const { type } = thinky;
const Post = thinky.createModel('post', {
  id: type.string(),
  author: type.string(),
  title: type.string().max(255),
  description: type.string().max(2048),
  createdAt: type.date().default(Date.now()),
  comments: type.array().default([]),
  authorId: type.string()
});

Post.hasMany(Comment, 'comments', 'id', 'postId');
Comment.belongsTo(Post, 'post', 'postId', 'id');

export default Post;
