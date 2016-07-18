import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import { auth } from './modules';

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true
});

const createReducers = (client) => combineReducers({
  routing,
  form,
  auth,
  apollo: client.reducer()
});

export default (history, initialState) => {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history);

  const client = (__CLIENT__) ? require('../../client').client : require('../../server').client;
  let middleware = [ thunkMiddleware, reduxRouterMiddleware, client.middleware() ];

  let finalCreateStore;
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools');
    const DevTools = require('../containers/DevTools/DevTools');

    middleware = [ ...middleware, loggerMiddleware ];

    finalCreateStore = compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(createStore);
  }

  const store = finalCreateStore(createReducers(client), initialState);

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('../../client', () => {
      store.replaceReducer(createReducers(require('../../client').client));
    });
  }

  return store;
};
