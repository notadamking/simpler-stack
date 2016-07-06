import { GraphQLSchema } from 'graphql';
import RootQuery from './query';

const Schema = new GraphQLSchema({
  query: RootQuery
});

export default Schema;
