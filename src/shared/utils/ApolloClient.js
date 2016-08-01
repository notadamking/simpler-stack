import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { graphqlEndpoint, authTokenName } from '../../config';

export default () => {
  const networkInterface = createNetworkInterface(graphqlEndpoint);
  networkInterface.use([{
    applyMiddleware(req, next) {
      if (__CLIENT__ && localStorage.getItem(authTokenName)) {
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
    shouldBatch: !__DEVELOPMENT__,
    formatError: (error) => `GQL Error: ${error}`,
    printErrors: (__DEVELOPMENT__)
  });
};
