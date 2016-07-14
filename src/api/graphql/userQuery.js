import { GraphQLObjectType, GraphQLList, GraphQLString } from 'graphql';
import UserType from './userType';


const UserQuery = {
  users: {
    type: new GraphQLList(UserType),
    resolve: resolve('user')
  },
  user: {
    type: UserType,
    args: {
      id: {
        type: GraphQLString
      }
    },
    resolve: resolve('user')
  }
};

export default UserQuery;
