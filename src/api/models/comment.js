import thinky from '../thinky';

const { type } = thinky;
const Comment = thinky.createModel('comment', {
  id: type.string(),
  author: type.string(),
  description: type.string().max(2048),
  createdAt: type.date().default(Date.now()),
  authorId: type.string(),
});

export default Comment;
