import { GraphQLObjectType } from 'graphql';

import UserQuery from './user/userQuery';

const RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    ...UserQuery
  }
});

export default RootQuery;
