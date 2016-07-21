import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { graphqlEndpoint, authTokenName } from '../../config';

export default () => {
  const networkInterface = createNetworkInterface(graphqlEndpoint);
  networkInterface.use([{
    applyMiddleware(req, next) {
      if (localStorage && localStorage.getItem(authTokenName)) {
        if (!req.options.headers) {
          req.options.headers = {};
        }
        req.options.headers.authorization = localStorage.getItem(authTokenName);
      }
      next();
    }
  }]);
  const shouldBatch = !(__DEVELOPMENT__);
  return new ApolloClient({
    networkInterface,
    shouldBatch,
    formatError: (error) => `GQL Error: ${error}`,
    printErrors: (__DEVELOPMENT__)
  });
};
