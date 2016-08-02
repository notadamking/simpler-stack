/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import { ApolloProvider } from 'react-apollo';
import { Router, browserHistory as routerHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { StyleSheet } from 'aphrodite';
import withScroll from 'scroll-behavior';

import createStore from './shared/redux/store';
import rootSaga from './shared/redux/sagas';
import getRoutes from './shared/routes';
import ApolloClient from './shared/utils/ApolloClient';

const dest = document.getElementById('content');

const client = ApolloClient();
const browserHistory = withScroll(routerHistory);
const store = createStore(browserHistory, client, window.__data);
const history = syncHistoryWithStore(browserHistory, store);
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
