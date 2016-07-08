import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    App,
    Chat,
    Home,
    NotFound,
  } from './containers';

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
