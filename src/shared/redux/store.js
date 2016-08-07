import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';

import { createReducers } from './reducers';

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true
});

export default (history, client, initialState) => {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history);
  const sagaMiddleware = createSagaMiddleware();

  let middleware = [ sagaMiddleware, reduxRouterMiddleware, client.middleware() ];

  let finalCreateStore;
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools');
    const DevTools = require('../containers/DevTools/DevTools');

    middleware = [ ...middleware, loggerMiddleware ];

    finalCreateStore = compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
      autoRehydrate()
    )(createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(createStore);
  }

  const store = finalCreateStore(createReducers(client), initialState);

  if (__DEVELOPMENT__ && module && module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducers(client));
    });
  }

  if (__CLIENT__) {
    persistStore(store);
  }

  store.runSaga = sagaMiddleware.run;

  return store;
};
