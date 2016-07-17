import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { graphqlEndpoint } from '../../config';

export default () => {
  const networkInterface = createNetworkInterface(graphqlEndpoint);
  return new ApolloClient({ networkInterface, shouldBatch: true });
};
