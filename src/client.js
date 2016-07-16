/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './shared/redux/create';
import io from 'socket.io-client';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-async-connect';
import { StyleSheet } from 'aphrodite';
import useScroll from 'scroll-behavior/lib/useStandardScroll';

import getRoutes from './shared/routes';

const _browserHistory = useScroll(() => browserHistory)();
const dest = document.getElementById('content');
const store = createStore(_browserHistory, window.__data);
const history = syncHistoryWithStore(_browserHistory, store);

function initSocket() {
  const socket = io('', {path: '/ws'});
  socket.on('news', (data) => {
    console.log(data);
    socket.emit('my other event', { my: 'data from client' });
  });
  socket.on('msg', (data) => {
    console.log(data);
  });

  return socket;
}

global.socket = initSocket();

const component = (
  <Router render={(props) =>
        <ReduxAsyncConnect {...props} filter={item => !item.deferred} />
      } history={history}>
    {getRoutes(store)}
  </Router>
);

StyleSheet.rehydrate(window.renderedClassNames);
ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  dest
);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
  const DevTools = require('./shared/containers/DevTools/DevTools');
  ReactDOM.render(
    <Provider store={store} key="provider">
      <div>
        {component}
        <DevTools />
      </div>
    </Provider>,
    dest
  );
}
