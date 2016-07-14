import { GraphQLSchema } from 'graphql';
import RootQuery from './query';
import RootMutation from './mutation';

const Schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});

export default Schema;
