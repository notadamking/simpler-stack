import { merge } from 'lodash';
import { userTypes, userQueries, userMutations, userResolvers } from './schemas';
import { EmailScalar, PasswordScalar } from './types';

export const schema = [`
scalar Email
scalar Password

${userTypes}

type RootQuery {
  ${userQueries}
}

type RootMutation {
  ${userMutations}
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`];

export const resolvers = {
  Email: EmailScalar,
  Password: PasswordScalar,
  RootQuery: {
    ...userResolvers.Query
  },
  RootMutation: {
    ...userResolvers.Mutation
  },
  AuthedUser: {
    ...userResolvers.AuthedUser
  }
};
