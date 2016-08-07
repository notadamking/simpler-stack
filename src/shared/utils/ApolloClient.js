import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { graphqlEndpoint, authTokenName } from '../../config';

export default () => {
  const networkInterface = createNetworkInterface(graphqlEndpoint);
  networkInterface.use([{
    applyMiddleware(req, next) {
      if (global.localStorage && localStorage.getItem(authTokenName)) {
        if (!req.options.headers) {
          req.options.headers = {};
        }
        req.options.headers.authorization = localStorage.getItem(authTokenName);
      }
      next();
    }
  }]);
  return new ApolloClient({
    networkInterface,
    shouldBatch: true, // !__DEVELOPMENT__ was here for some reason,
    dataIdFromObject: object => object.id
  });
};
