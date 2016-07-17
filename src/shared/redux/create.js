import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import * as reducers from './modules';

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true
});

export default (history, initialState) => {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history);

  const middleware = [ thunkMiddleware, reduxRouterMiddleware ];

  const store = createStore(
    combineReducers({
      ...reducers
    }),
    applyMiddleware(...middleware)
  );

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./modules', () => {
      store.replaceReducer(combineReducers({
        ...require('./modules')
      }));
    });
  }

  return store;
};
