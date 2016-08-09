import {
  userTypes, userQueries, userMutations, userResolvers,
  postTypes, postQueries, postMutations, postResolvers,
  commentTypes, commentQueries, commentMutations, commentResolvers,
} from './schemas';
import { EmailScalar, PasswordScalar, DateScalar } from './types';

export const schema = [`
  scalar Email
  scalar Password
  scalar Date

  ${userTypes}
  ${postTypes}
  ${commentTypes}

  type RootQuery {
    ${userQueries}
    ${postQueries}
    ${commentQueries}
  }

  type RootMutation {
    ${userMutations}
    ${postMutations}
    ${commentMutations}
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`];

export const resolvers = {
  Email: EmailScalar,
  Password: PasswordScalar,
  Date: DateScalar,
  RootQuery: {
    ...userResolvers.Query,
    ...postResolvers.Query,
    ...commentResolvers.Query,
  },
  RootMutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentResolvers.Mutation,
  }
};
