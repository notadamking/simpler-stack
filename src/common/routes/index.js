import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './App';
import Chat from './Chat/Chat';
import Home from './Home/Home';
import NotFound from './NotFound/NotFound';

export default (store) => {
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home} />

      { /* Routes */ }
      <Route path="chat" component={Chat} />

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
