import Koa from 'koa';
import Router from 'koa-router';
import json from 'koa-json';
import onerror from 'koa-onerror';
import bodyparser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import mount from 'koa-mount';
import convert from 'koa-convert';
import graphqlHTTP from 'koa-graphql';
import PrettyError from 'pretty-error';
import http from 'http';
import SocketIO from 'socket.io';
import config from '../config';
import Schema from './graphql/schema';

const app = new Koa();
const server = http.createServer(app.callback());
const pretty = new PrettyError();
const io = new SocketIO(server);
io.path('/ws');

const _use = app.use;
app.use = fn => _use.call(app, convert(fn));

// middlewares
app.use(bodyparser());
app.use(json());
app.use(helmet());

// setup graphql server
app.use(mount('/graphql', graphqlHTTP({
  schema: Schema,
  graphiql: true
})));

// // Setup all API routes
// const router = Router();
// require('./routes')(router);
//
// // mount root routes
// app.use(router.routes());
// app.use(router.allowedMethods());

const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;

if (config.apiPort) {
  const runnable = app.listen(config.apiPort, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
    console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort);
  });

  io.on('connection', (socket) => {
    socket.emit('news', {msg: `'Hello World!' from server`});

    socket.on('history', () => {
      for (let index = 0; index < bufferSize; index++) {
        const msgNo = (messageIndex + index) % bufferSize;
        const msg = messageBuffer[msgNo];
        if (msg) {
          socket.emit('msg', msg);
        }
      }
    });

    socket.on('msg', (data) => {
      data.id = messageIndex;
      messageBuffer[messageIndex % bufferSize] = data;
      messageIndex++;
      io.emit('msg', data);
    });
  });
  io.listen(runnable);
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
