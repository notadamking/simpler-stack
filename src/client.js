/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import { ApolloProvider } from 'react-apollo';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { StyleSheet } from 'aphrodite';
import useScroll from 'scroll-behavior/lib/useStandardScroll';

import createStore from './shared/redux/store';
import rootSaga from './shared/redux/sagas';
import getRoutes from './shared/routes';
import ApolloClient from './shared/utils/ApolloClient';

const dest = document.getElementById('content');

export const client = ApolloClient();
const _browserHistory = useScroll(() => browserHistory)();
const store = createStore(_browserHistory, window.__data);
const history = syncHistoryWithStore(_browserHistory, store);
const routes = getRoutes(store);

store.runSaga(rootSaga);

global.socket = () => {
  const socket = io('', { path: '/ws' });
  socket.on('msg', (data) => {
    console.log(data);
    socket.emit('my other event', { my: 'data from client' });
  });
  return socket;
};

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger
}

StyleSheet.rehydrate(window.renderedClassNames);

ReactDOM.render(
  <ApolloProvider client={client} store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </ApolloProvider>,
  dest
);
