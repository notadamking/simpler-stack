import Express from 'express';
import React from 'react';
import favicon from 'serve-favicon';
import compression from 'compression';
import http from 'http';
import httpProxy from 'http-proxy';
import path from 'path';
import PrettyError from 'pretty-error';
import { renderToStaticMarkup, renderToString } from 'react-dom-stream/server';
import { createMemoryHistory, match, RouterContext, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { host, port, apiHost, apiPort } from './config';

import { Html } from './common/containers';
import getRoutes from './common/routes';
import createStore from './common/redux/store';
import rootSaga from './common/redux/sagas';
import ApolloClient from './common/utils/ApolloClient';

const client = ApolloClient();
const targetUrl = `http://${apiHost}:${apiPort}`;
const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);
const proxy = httpProxy.createProxyServer({
  target: targetUrl,
  ws: true
});

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

app.use(Express.static(path.join(__dirname, '..', 'static')));

// Proxy to API server
app.use('/api', (req, res) => {
  proxy.web(req, res, { target: targetUrl });
});

app.use('/ws', (req, res) => {
  proxy.web(req, res, { target: targetUrl + '/ws' });
});

server.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head);
});

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
  let json;
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, { 'content-type': 'application/json' });
  }

  json = { error: 'proxy_error', reason: error.message };
  res.end(JSON.stringify(json));
});

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }
  const memoryHistory = createMemoryHistory(req.originalUrl);
  const store = createStore(memoryHistory, client);
  const history = syncHistoryWithStore(memoryHistory, store);
  const routes = getRoutes(store);

  function hydrateOnClient() {
    renderToString(<Html assets={webpackIsomorphicTools.assets()} client={client}
                    store={store}/>);
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  match({ history, routes, location: req.originalUrl }, async (err, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (err) {
      console.error('ROUTER ERROR:', pretty.render(err));
      res.status(500).send(err.message);
      hydrateOnClient();
    } else if (!renderProps) {
      res.status(404).send('Not found');
    } else {
      await store.runSaga(rootSaga);
      res.status(200);
      res.write('<!DOCTYPE html>');
      const htmlStream = renderToStaticMarkup(
        <Html assets={webpackIsomorphicTools.assets()} client={client} store={store} renderProps={renderProps}/>
      );
      htmlStream.pipe(res, { end: false });
      htmlStream.on('end', () => res.end());
    }
  });
});

if (port) {
  server.listen(port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅  Server-rendered app is running, talking to API server on %s.', apiPort);
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', host, port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
