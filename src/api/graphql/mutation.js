import { GraphQLObjectType } from 'graphql';

import UserMutation from './user/userMutation';

const RootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...UserMutation
  }
});

export default RootMutation;
